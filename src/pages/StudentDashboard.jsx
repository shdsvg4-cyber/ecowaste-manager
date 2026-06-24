import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingDown, Target, LogOut, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export function StudentDashboard() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [studentGoal, setStudentGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wasteLogs, setWasteLogs] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || user?.isAdmin) {
      navigate('/');
      return;
    }
    loadStudentData();
  }, [isAuthenticated, user, navigate]);

  const loadStudentData = () => {
    try {
      const students = JSON.parse(localStorage.getItem('ecowaste_students') || '[]');
      const current = students.find(s => s.email === user?.email);
      
      if (current) {
        setStudentData(current);
        
        // Load goal
        const goals = JSON.parse(localStorage.getItem('ecowaste_student_goals') || '{}');
        if (goals[current.id]) {
          setStudentGoal(goals[current.id]);
        }
        
        // Load waste logs
        const allLogs = JSON.parse(localStorage.getItem('ecowaste_waste_logs') || '[]');
        const studentLogs = allLogs.filter(log => log.studentId === current.id);
        setWasteLogs(studentLogs);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error loading student data:', err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated || loading) {
    return null;
  }

  const totalWaste = wasteLogs.reduce((sum, log) => sum + (log.amount || 0), 0);
  const wastePercentage = studentGoal 
    ? Math.min((totalWaste / studentGoal.goal) * 100, 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-navy-900 dark:to-navy-800">
      {/* Header */}
      <nav className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Leaf className="text-cyan-400" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Meu Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{studentData?.name}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl p-8 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-2">Bem-vindo, {studentData?.name}! 👋</h2>
            <p className="text-cyan-50">Classe: <span className="font-semibold">{studentData?.classroom}</span></p>
            <p className="text-cyan-50 text-sm mt-1">
              Seu objetivo é reduzir o desperdício de alimentos. Veja seu progresso abaixo!
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Total Waste */}
          <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-navy-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Desperdício Total</h3>
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <TrendingDown className="text-red-500" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{totalWaste}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">gramas</p>
          </div>

          {/* Goal */}
          <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-navy-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Meta</h3>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Target className="text-yellow-500" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {studentGoal?.goal || '—'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">gramas máximas</p>
          </div>

          {/* Remaining */}
          <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-navy-700 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400 font-semibold">Limite Restante</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Leaf className="text-green-500" size={24} />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              {studentGoal?.goal ? Math.max(0, studentGoal.goal - totalWaste) : '—'}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">gramas disponíveis</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {studentGoal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-navy-700 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Progresso da Meta</h3>
              <span className="text-2xl font-bold text-cyan-400">{wastePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${wastePercentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full transition-colors ${
                  wastePercentage <= 50
                    ? 'bg-green-500'
                    : wastePercentage <= 80
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
              {wastePercentage <= 50
                ? '✅ Parabéns! Você está no caminho certo!'
                : wastePercentage <= 80
                ? '⚠️ Cuidado! Você está perto da meta.'
                : '❌ Você ultrapassou sua meta!'}
            </p>
          </motion.div>
        )}

        {/* Curiosity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg mb-8"
        >
          <h3 className="text-xl font-bold mb-2">🌱 Curiosidade do Dia</h3>
          <p className="text-purple-50">
            Você sabia? Uma pessoa desperdiça, em média, 94kg de comida por ano. 
            Se você reduzir seu desperdício em apenas 10%, já estará ajudando a salvar 9,4kg de alimentos! 
            Isso é suficiente para alimentar uma pessoa durante quase 2 semanas!
          </p>
        </motion.div>

        {/* Waste Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-navy-700 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 size={24} />
            Histórico de Registros
          </h3>
          
          {wasteLogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Nenhum registro de desperdício encontrado. Isso é ótimo! 🎉
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-navy-700">
                    <th className="px-4 py-3 text-gray-600 dark:text-gray-400">Data</th>
                    <th className="px-4 py-3 text-gray-600 dark:text-gray-400">Descrição</th>
                    <th className="px-4 py-3 text-gray-600 dark:text-gray-400">Quantidade (g)</th>
                    <th className="px-4 py-3 text-gray-600 dark:text-gray-400">Motivo</th>
                  </tr>
                </thead>
                <tbody>
                  {wasteLogs.map((log, idx) => (
                    <tr key={idx} className="border-b border-gray-100 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700/50">
                      <td className="px-4 py-3 text-gray-900 dark:text-white text-sm">
                        {new Date(log.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{log.description}</td>
                      <td className="px-4 py-3 font-semibold text-red-500">{log.amount}g</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-sm">{log.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Desenvolvido por Adrian Resende © 2024</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
