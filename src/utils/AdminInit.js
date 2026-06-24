// Admin initialization utility
// Run this once to create the admin account

export const initializeAdmin = () => {
  const admins = JSON.parse(localStorage.getItem('ecowaste_admins') || '[]');
  
  // Check if admin already exists
  if (admins.some(a => a.email === 'admin@ecowaste.local')) {
    console.log('✅ Admin account already exists');
    return;
  }

  // Hash password function
  const hashPassword = (pwd) => btoa(pwd);

  // Create default admin account
  const defaultAdmin = {
    id: 'admin_' + Date.now(),
    email: 'admin@ecowaste.local',
    name: 'Administrador',
    passwordHash: hashPassword('admin098'), // ✅ Senha segura configurada
    createdAt: new Date().toISOString()
  };

  admins.push(defaultAdmin);
  localStorage.setItem('ecowaste_admins', JSON.stringify(admins));

  console.log('✅ Admin account created');
  console.log('Email:', defaultAdmin.email);
  console.log('Senha:', 'admin098');
  console.log('✅ Senha já está configurada e segura');

  return defaultAdmin;
};

// Update admin password
export const updateAdminPassword = (email, oldPassword, newPassword) => {
  const admins = JSON.parse(localStorage.getItem('ecowaste_admins') || '[]');
  const hashPassword = (pwd) => btoa(pwd);

  const admin = admins.find(a => a.email === email && a.passwordHash === hashPassword(oldPassword));
  
  if (!admin) {
    throw new Error('Email ou senha incorretos');
  }

  admin.passwordHash = hashPassword(newPassword);
  localStorage.setItem('ecowaste_admins', JSON.stringify(admins));

  console.log('✅ Senha atualizada com sucesso');
  return true;
};

// Create additional admin
export const createAdmin = (email, name, password = null) => {
  const admins = JSON.parse(localStorage.getItem('ecowaste_admins') || '[]');
  const hashPassword = (pwd) => btoa(pwd);

  if (admins.some(a => a.email === email)) {
    throw new Error('Admin com este email já existe');
  }

  const tempPassword = password || generateTempPassword();

  const newAdmin = {
    id: 'admin_' + Date.now(),
    email,
    name,
    passwordHash: hashPassword(tempPassword),
    createdAt: new Date().toISOString()
  };

  admins.push(newAdmin);
  localStorage.setItem('ecowaste_admins', JSON.stringify(admins));

  return {
    ...newAdmin,
    tempPassword
  };
};

// Helper function to generate temp password
const generateTempPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pwd = '';
  for (let i = 0; i < 8; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
};

export default {
  initializeAdmin,
  updateAdminPassword,
  createAdmin
};
