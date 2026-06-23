// User Types
export const UserRoles = {
  MASTER_ADMIN: 'master_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPERVISOR: 'supervisor',
  OPERATOR: 'operator',
  VISITOR: 'visitor'
};

export const PermissionLevels = {
  [UserRoles.MASTER_ADMIN]: ['all'],
  [UserRoles.ADMIN]: ['manage_users', 'manage_units', 'view_reports', 'manage_settings'],
  [UserRoles.MANAGER]: ['manage_records', 'view_reports', 'manage_metas'],
  [UserRoles.SUPERVISOR]: ['create_records', 'view_reports'],
  [UserRoles.OPERATOR]: ['create_records'],
  [UserRoles.VISITOR]: ['view_reports']
};

// Waste Categories
export const WasteCategories = [
  'Frutas',
  'Verduras',
  'Legumes',
  'Carnes',
  'Laticínios',
  'Padaria',
  'Grãos',
  'Refeições prontas',
  'Sobremesas',
  'Bebidas',
  'Outros'
];

// Waste Reasons
export const WasteReasons = [
  'Vencimento',
  'Produção excessiva',
  'Armazenamento inadequado',
  'Transporte',
  'Manipulação incorreta',
  'Problemas operacionais',
  'Outros'
];

// Alert Types
export const AlertTypes = {
  GOAL_EXCEEDED: 'goal_exceeded',
  GOAL_NOT_REACHED: 'goal_not_reached',
  ABNORMAL_GROWTH: 'abnormal_growth',
  MISSING_RECORDS: 'missing_records',
  CRITICAL_OCCURRENCE: 'critical_occurrence'
};

// Unit Types
export const UnitTypes = {
  HEADQUARTERS: 'headquarters',
  BRANCH: 'branch',
  FACILITY: 'facility'
};

export default {
  UserRoles,
  PermissionLevels,
  WasteCategories,
  WasteReasons,
  AlertTypes,
  UnitTypes
};
