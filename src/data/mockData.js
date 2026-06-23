// Mock Data for EcoWaste Manager

export const mockUsers = [
  {
    id: 'user_1',
    name: 'Admin Master',
    email: 'admin@ecowaste.com',
    role: 'master_admin',
    unit: 'Matriz',
    active: true,
    createdAt: '2026-01-01'
  },
  {
    id: 'user_2',
    name: 'Gerente Geral',
    email: 'gerente@ecowaste.com',
    role: 'manager',
    unit: 'Matriz',
    active: true,
    createdAt: '2026-01-05'
  },
  {
    id: 'user_3',
    name: 'Supervisor',
    email: 'supervisor@ecowaste.com',
    role: 'supervisor',
    unit: 'Filial 01',
    active: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'user_4',
    name: 'Operador',
    email: 'operador@ecowaste.com',
    role: 'operator',
    unit: 'Matriz',
    active: true,
    createdAt: '2026-01-15'
  }
];

export const mockUnits = [
  {
    id: 'unit_1',
    name: 'Matriz',
    type: 'headquarters',
    location: 'São Paulo, SP',
    manager: 'Gerente Geral',
    active: true
  },
  {
    id: 'unit_2',
    name: 'Filial 01',
    type: 'branch',
    location: 'Rio de Janeiro, RJ',
    manager: 'Supervisor',
    active: true
  },
  {
    id: 'unit_3',
    name: 'Filial 02',
    type: 'branch',
    location: 'Belo Horizonte, MG',
    manager: 'Coordenador',
    active: true
  }
];

export const mockWasteRecords = [
  {
    id: 'waste_1',
    date: '2026-06-23',
    time: '10:30',
    unit: 'Matriz',
    sector: 'Cozinha',
    category: 'Frutas',
    product: 'Maçã estragada',
    quantity: 5,
    weight: 2.5,
    value: 12.50,
    reason: 'Vencimento',
    responsible: 'Operador',
    observations: 'Frutas com manchas pretas',
    hasPhoto: true,
    createdAt: '2026-06-23T10:30:00Z'
  },
  {
    id: 'waste_2',
    date: '2026-06-23',
    time: '14:15',
    unit: 'Matriz',
    sector: 'Refeitório',
    category: 'Verduras',
    product: 'Alface',
    quantity: 2,
    weight: 1.2,
    value: 8.00,
    reason: 'Armazenamento inadequado',
    responsible: 'Operador',
    observations: 'Alface murchada',
    hasPhoto: false,
    createdAt: '2026-06-23T14:15:00Z'
  },
  {
    id: 'waste_3',
    date: '2026-06-22',
    time: '09:45',
    unit: 'Filial 01',
    sector: 'Cozinha',
    category: 'Carnes',
    product: 'Peito de frango',
    quantity: 8,
    weight: 4.0,
    value: 80.00,
    reason: 'Produção excessiva',
    responsible: 'Supervisor',
    observations: 'Fogo muito alto',
    hasPhoto: true,
    createdAt: '2026-06-22T09:45:00Z'
  }
];

export const mockGoals = [
  {
    id: 'goal_1',
    unit: 'Matriz',
    period: 'June 2026',
    targetValue: 50.0,
    currentValue: 35.5,
    percentage: 71,
    status: 'on_track'
  },
  {
    id: 'goal_2',
    unit: 'Filial 01',
    period: 'June 2026',
    targetValue: 40.0,
    currentValue: 42.3,
    percentage: 106,
    status: 'exceeded'
  }
];

export const mockAlerts = [
  {
    id: 'alert_1',
    type: 'goal_exceeded',
    unit: 'Filial 01',
    message: 'Meta de desperdício foi ultrapassada em 6%',
    severity: 'high',
    read: false,
    createdAt: '2026-06-23T15:30:00Z'
  },
  {
    id: 'alert_2',
    type: 'abnormal_growth',
    unit: 'Matriz',
    message: 'Crescimento anormal de 40% em desperdício',
    severity: 'medium',
    read: false,
    createdAt: '2026-06-23T14:00:00Z'
  }
];

// Mockdata para gráficos
export const mockChartData = {
  daily: [
    { date: '2026-06-17', value: 25.5 },
    { date: '2026-06-18', value: 28.3 },
    { date: '2026-06-19', value: 22.1 },
    { date: '2026-06-20', value: 31.7 },
    { date: '2026-06-21', value: 26.4 },
    { date: '2026-06-22', value: 29.8 },
    { date: '2026-06-23', value: 27.6 }
  ],
  byCategory: [
    { name: 'Frutas', value: 35, percentage: 18 },
    { name: 'Verduras', value: 28, percentage: 14 },
    { name: 'Carnes', value: 52, percentage: 27 },
    { name: 'Laticínios', value: 41, percentage: 21 },
    { name: 'Padaria', value: 22, percentage: 11 },
    { name: 'Outros', value: 16, percentage: 9 }
  ],
  byUnit: [
    { name: 'Matriz', value: 95.5 },
    { name: 'Filial 01', value: 78.3 },
    { name: 'Filial 02', value: 52.1 }
  ]
};

export const mockDashboardMetrics = {
  totalWaste: 226.0,
  wasteRecords: 152,
  estimatedSavings: 1892.50,
  goalAchieved: 71,
  goalRemaining: 29,
  efficiencyIndex: 84,
  environmentalImpact: 1250,
  financialSavings: 2340.75
};

export default {
  mockUsers,
  mockUnits,
  mockWasteRecords,
  mockGoals,
  mockAlerts,
  mockChartData,
  mockDashboardMetrics
};
