import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TrendingDown, Leaf as LeafIcon, DollarSign, BarChart3, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const stats = [
    { label: 'Desperdício Reduzido', value: '45%', icon: TrendingDown, color: 'text-green-500' },
    { label: 'CO₂ Evitado', value: '2.5t', icon: LeafIcon, color: 'text-cyan-400' },
    { label: 'Economia Gerada', value: 'R$ 85K', icon: DollarSign, color: 'text-yellow-500' },
    { label: 'Unidades Ativas', value: '12', icon: BarChart3, color: 'text-blue-500' }
  ];

  const benefits = [
    { title: 'Monitoramento em Tempo Real', description: 'Acompanhe o desperdício conforme acontece' },
    { title: 'Análises Avançadas', description: 'Dashboards e relatórios inteligentes' },
    { title: 'Controle Multi-Unidade', description: 'Gerencie múltiplas filiais e setores' },
    { title: 'Alertas Inteligentes', description: 'Notificações automáticas de anomalias' },
    { title: 'Segurança Premium', description: 'Proteção de dados empresarial' },
    { title: 'Suporte Completo', description: 'Equipe dedicada 24/7' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-navy-900 overflow-hidden">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-navy-700 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Leaf className="text-cyan-400" size={24} />
            </div>
            <span className="font-bold text-xl text-cyan-400">EcoWaste Manager</span>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => navigate(user?.isAdmin ? '/admin' : '/student-dashboard')}
                className="btn-primary"
              >
                Dashboard <ArrowRight size={18} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="btn-secondary"
                >
                  Entrar
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="btn-primary"
                >
                  Começar <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-navy-900 dark:text-white leading-tight">
              Controle Total sobre Desperdício{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Alimentar
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Plataforma corporativa que transforma dados em ações efetivas de redução de desperdício alimentar. Resultados mensuráveis, impacto real.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(isAuthenticated ? (user?.isAdmin ? '/admin' : '/student-dashboard') : '/auth')}
                className="btn-primary px-8"
              >
                {isAuthenticated ? 'Ir para Dashboard' : 'Começar Agora'} <ArrowRight size={20} />
              </button>
              <button className="btn-secondary px-8">
                Saber Mais
              </button>
            </div>
          </motion.div>

          {/* Hero Image - Placeholder */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl flex items-center justify-center overflow-hidden"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl"
            >
              📊
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-navy-900 to-transparent opacity-40"></div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">Resultados Comprovados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="card p-6 text-center">
              <stat.icon className={`${stat.color} mx-auto mb-4`} size={32} />
              <h3 className="text-2xl font-bold mb-2 text-navy-900 dark:text-white">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800 dark:to-navy-900 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">Recursos Principais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-cyan-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-navy-900 dark:text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-navy-900 dark:text-white">Pronto para reduzir desperdício?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Junte-se a organizações líderes que estão transformando dados em ações concretas de sustentabilidade.
        </p>
        <button
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
          className="btn-primary px-8 mx-auto"
        >
          {isAuthenticated ? 'Acessar Plataforma' : 'Criar Conta Grátis'} <ArrowRight size={20} />
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-navy-700 bg-navy-50 dark:bg-navy-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2026 EcoWaste Manager. Transformando dados em redução de desperdício.</p>
          <p className="mt-2 text-xs">Desenvolvido por Adrian Resende</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
