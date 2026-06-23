import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { mockDashboardMetrics, mockAlerts } from '../data/mockData';

export function Dashboard() {
  const metrics = mockDashboardMetrics;

  const cards = [
    {
      label: 'Total de Desperdício',
      value: `${metrics.totalWaste} kg`,
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      label: 'Registros',
      value: metrics.wasteRecords,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Economia Estimada',
      value: `R$ ${metrics.estimatedSavings.toFixed(2)}`,
      icon: Users,
      color: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      label: 'Meta Atingida',
      value: `${metrics.goalAchieved}%`,
      icon: AlertCircle,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-navy-900 dark:text-white">Dashboard Executivo</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Visão geral do desempenho de desperdício alimentar</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`card p-6 border-t-4 border-gradient-to-r border-cyan-400`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{card.label}</p>
                <h3 className={`text-3xl font-bold ${card.textColor}`}>{card.value}</h3>
              </div>
              <card.icon className={card.textColor} size={32} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Waste Records */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 card p-6"
        >
          <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Últimos Registros</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-navy-700 last:border-0">
                <div>
                  <p className="font-medium text-navy-900 dark:text-white">Desperdício #{idx}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Categoria: Frutas</p>
                </div>
                <span className="text-sm font-bold text-cyan-400">5 kg</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-xl font-bold text-navy-900 dark:text-white mb-4">Alertas Ativos</h2>
          <div className="space-y-3">
            {mockAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg ${
                  alert.severity === 'high'
                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700'
                }`}
              >
                <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">{alert.unit}</p>
                <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">{alert.message}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Watermark */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-400 dark:text-gray-600 pointer-events-none">
        Developed by Adrian Resende
      </div>
    </div>
  );
}

export default Dashboard;
