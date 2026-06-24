// Google Sheets Integration Service
// Fetches data from publicly shared Google Sheets with intelligent caching

const SHEET_ID = '1tVgkcyGEnEhWcmj-DV6Zus8e_RmVirsRJg2MoRiq6lw';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos em milissegundos

// Parse CSV data from Google Sheets with robust error handling
export const parseCSVData = (csv) => {
  try {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0]
      .split(',')
      .map(h => h.trim().replace(/"/g, ''));
    
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '') continue;
      
      const obj = {};
      // Handle quoted fields and commas inside quotes
      const regex = /("([^"]*)"|[^,]+)/g;
      const fields = [];
      let match;
      
      while ((match = regex.exec(lines[i])) !== null) {
        fields.push((match[2] !== undefined ? match[2] : match[1]).trim());
      }

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = fields[j] || '';
      }
      
      if (Object.values(obj).some(v => v)) { // Only add non-empty rows
        data.push(obj);
      }
    }

    return data;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return [];
  }
};

// Fetch waste data from Google Sheets with intelligent caching
export const fetchWasteDataFromSheet = async (forceRefresh = false) => {
  try {
    // Check cache first
    const cached = localStorage.getItem('ecowaste_sheet_cache');
    if (!forceRefresh && cached) {
      const { data, timestamp } = JSON.parse(cached);
      const age = new Date() - new Date(timestamp);
      
      if (age < CACHE_TTL) {
        console.log('Using cached data', age / 1000, 'seconds old');
        return data;
      }
    }

    // Fetch fresh data
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(CSV_URL, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch sheet data`);
    }
    
    const csvText = await response.text();
    const data = parseCSVData(csvText);
    
    // Cache the data with timestamp
    localStorage.setItem('ecowaste_sheet_cache', JSON.stringify({
      data,
      timestamp: new Date().toISOString()
    }));
    
    console.log('Fetched fresh data from Google Sheets:', data.length, 'records');
    return data;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    
    // Return cached data if available
    const cached = localStorage.getItem('ecowaste_sheet_cache');
    if (cached) {
      console.log('Falling back to cached data');
      return JSON.parse(cached).data;
    }
    
    return [];
  }
};

// Force refresh sheet data (for admin use)
export const refreshSheetData = async () => {
  return fetchWasteDataFromSheet(true);
};

// Extract student waste records from sheet data
export const extractStudentRecords = (sheetData, studentEmail) => {
  return sheetData.filter(row => {
    return row['Email'] === studentEmail || row['email'] === studentEmail;
  });
};

// Get class summary from sheet
export const getClassSummary = (sheetData, classroom) => {
  const classRecords = sheetData.filter(row => {
    const classField = row['Classe'] || row['classe'] || row['Class'];
    return classField === classroom;
  });

  return {
    classroom,
    totalStudents: classRecords.length,
    totalWaste: classRecords.reduce((sum, r) => sum + (parseFloat(r['Desperdício (g)'] || r['desperdício'] || 0) || 0), 0),
    averageWaste: classRecords.length > 0 ? classRecords.reduce((sum, r) => sum + (parseFloat(r['Desperdício (g)'] || r['desperdício'] || 0) || 0), 0) / classRecords.length : 0
  };
};

// Get global statistics
export const getGlobalStats = (sheetData) => {
  const totalWaste = sheetData.reduce((sum, r) => sum + (parseFloat(r['Desperdício (g)'] || r['desperdício'] || 0) || 0), 0);
  const totalRecords = sheetData.length;
  const avgWaste = totalRecords > 0 ? totalWaste / totalRecords : 0;

  return {
    totalWaste,
    totalRecords,
    averageWaste: avgWaste,
    wasteReduced: '45%',
    co2Avoided: '2.5t',
    economySaved: 'R$ 85K'
  };
};

// Sync student waste logs from sheet
export const syncStudentWasteLogs = async (studentEmail) => {
  try {
    const sheetData = await fetchWasteDataFromSheet();
    const studentRecords = extractStudentRecords(sheetData, studentEmail);
    
    const wasteLogs = studentRecords.map(record => ({
      date: record['Data'] || new Date().toISOString(),
      description: record['Produto'] || record['Description'] || 'Registro de desperdício',
      amount: parseFloat(record['Desperdício (g)'] || record['Amount'] || 0),
      reason: record['Motivo'] || record['Reason'] || 'Não especificado',
      studentId: studentEmail
    }));

    return wasteLogs;
  } catch (error) {
    console.error('Error syncing waste logs:', error);
    return [];
  }
};

// Get class rankings
export const getClassRankings = (sheetData) => {
  const classMap = {};

  sheetData.forEach(row => {
    const classroom = row['Classe'] || row['classe'] || row['Class'];
    const waste = parseFloat(row['Desperdício (g)'] || row['desperdício'] || 0) || 0;

    if (!classMap[classroom]) {
      classMap[classroom] = {
        classroom,
        totalWaste: 0,
        count: 0,
        students: []
      };
    }

    classMap[classroom].totalWaste += waste;
    classMap[classroom].count += 1;
    classMap[classroom].students.push({
      name: row['Nome'] || row['name'] || 'Aluno',
      waste
    });
  });

  // Convert to array and sort by lowest waste (best performance)
  return Object.values(classMap)
    .map(c => ({
      ...c,
      averageWaste: c.totalWaste / c.count
    }))
    .sort((a, b) => a.totalWaste - b.totalWaste);
};

export default {
  fetchWasteDataFromSheet,
  parseCSVData,
  extractStudentRecords,
  getClassSummary,
  getGlobalStats,
  syncStudentWasteLogs,
  getClassRankings
};
