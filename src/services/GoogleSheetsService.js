// Google Sheets Integration Service
// Fetches data from publicly shared Google Sheets

const SHEET_ID = '1tVgkcyGEnEhWcmj-DV6Zus8e_RmVirsRJg2MoRiq6lw';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

// Parse CSV data from Google Sheets
export const parseCSVData = (csv) => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const obj = {};
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j]?.trim() || '';
    }
    data.push(obj);
  }

  return data;
};

// Fetch waste data from Google Sheets
export const fetchWasteDataFromSheet = async () => {
  try {
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }
    
    const csvText = await response.text();
    const data = parseCSVData(csvText);
    
    // Cache the data
    localStorage.setItem('ecowaste_sheet_cache', JSON.stringify({
      data,
      timestamp: new Date().toISOString()
    }));
    
    return data;
  } catch (error) {
    console.error('Error fetching Google Sheet:', error);
    
    // Return cached data if available
    const cached = localStorage.getItem('ecowaste_sheet_cache');
    if (cached) {
      return JSON.parse(cached).data;
    }
    
    return [];
  }
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
