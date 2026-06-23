import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Target, TrendingDown, Award, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export function About() {
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

  const objectives = [
    {
      icon: TrendingDown,
      title: 'Reduzir Desperdício',
      description: 'Diminuir significativamente o desperdício alimentar através de monitoramento e análise de dados'
    },
    {
      icon: Leaf,
      title: 'Impacto Ambiental',
      description: 'Contribuir para sustentabilidade reduzindo emissões de CO₂ e resíduos'
    },
    {
      icon: Award,
      title: 'Eficiência Operacional',
      description: 'Otimizar processos e reduzir custos operacionais'
    },
    {
      icon: Users,
      title: 'Engajamento',
      description: 'Envolver equipes na cultura de sustentabilidade'
    }
  ];

  const methodology = [
    { step: '1', title: 'Coleta', description: 'Registro sistemático de desperdício alimentar' },
    { step: '2', title: 'Análise', description: 'Análise de dados e identificação de padrões' },
    { step: '3', title: 'Insights', description: 'Geração de insights acionáveis' },
    { step: '4', title: 'Melhoria', description: 'Implementação de ações de melhoria' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-navy-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-navy-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
            <Leaf className="text-cyan-400" size={24} />
            <span className="font-bold text-xl text-cyan-400">EcoWaste</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Voltar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-6 text-navy-900 dark:text-white">
            Sobre o <span className="text-cyan-400">EcoWaste Manager</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Uma solução inovadora para transformar dados de desperdício alimentar em ações concretas de sustentabilidade empresarial.
          </motion.p>
        </div>
      </motion.section>

      {/* Objetivos */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-navy-800 dark:to-navy-900 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">Objetivos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, idx) => (
              <motion.div key={idx} variants={itemVariants} className="card p-6 text-center">
                <obj.icon className="text-cyan-400 mx-auto mb-4" size={40} />
                <h3 className="font-bold text-navy-900 dark:text-white mb-2">{obj.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{obj.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Metodologia */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">Metodologia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodology.map((item, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative">
              {idx < methodology.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
              )}
              <div className="card p-6 text-center relative z-10">
                <div className="w-12 h-12 bg-cyan-400 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Impacto */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800 dark:to-navy-900 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">Impacto Esperado</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="card p-8 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">45%</div>
              <p className="font-bold text-navy-900 dark:text-white mb-2">Redução de Desperdício</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Diminuição significativa em 12 meses</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card p-8 text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">2.5t</div>
              <p className="font-bold text-navy-900 dark:text-white mb-2">CO₂ Evitado</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Impacto ambiental positivo anual</p>
            </motion.div>
            <motion.div variants={itemVariants} className="card p-8 text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">R$ 85K</div>
              <p className="font-bold text-navy-900 dark:text-white mb-2">Economia Gerada</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Redução de custos operacionais</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Sustentabilidade */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-navy-900 dark:text-white">Comprometimento com Sustentabilidade</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="card p-8">
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">🌍 Ambiental</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Redução de emissões de gases do efeito estufa</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Economia de recursos hídricos</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Minimização de resíduos em aterros</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Contribuição para economia circular</span>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-8">
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-4">💼 Social e Financeiro</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Redução significativa de custos operacionais</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Melhoria de imagem corporativa</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Envolvimento de equipes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Conformidade com regulamentações ambientais</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-navy-900 dark:text-white">Pronto para começar?</h2>
        <button
          onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
          className="btn-primary px-8 mx-auto"
        >
          {isAuthenticated ? 'Acessar Plataforma' : 'Começar Agora'}
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

export default About;
