import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { badges } from '../data/gamification';

export function BadgesDisplay({ wasteAmount, completedChallenges, quizScore }) {
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    const earned = [];
    
    // Iniciante Sustentável - 1 desafio completado
    if (completedChallenges >= 1) {
      earned.push(badges[0]);
    }
    
    // Protetor de Alimentos - 50kg poupados
    if (wasteAmount >= 50000) {
      earned.push(badges[1]);
    }
    
    // Herói Verde - 500 pontos
    if (quizScore >= 500) {
      earned.push(badges[2]);
    }
    
    // Mestre da Sustentabilidade - 10 desafios
    if (completedChallenges >= 10) {
      earned.push(badges[3]);
    }
    
    // Guardião do Planeta - 30 dias
    if (completedChallenges >= 30) {
      earned.push(badges[4]);
    }
    
    // Enciclopédia Verde - 8 acertos quiz
    if (quizScore >= 80) {
      earned.push(badges[5]);
    }
    
    setEarnedBadges(earned);
  }, [wasteAmount, completedChallenges, quizScore]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="bg-white dark:bg-navy-800 rounded-2xl p-6 border border-gray-200 dark:border-navy-700 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        🏅 Suas Conquistas ({earnedBadges.length}/{badges.length})
      </h3>

      {earnedBadges.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Complete desafios e ganhe badges! 🎯
        </p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {earnedBadges.map((badge) => (
            <motion.div
              key={badge.id}
              variants={itemVariants}
              className="bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-lg p-4 text-center border-2 border-yellow-300 dark:border-yellow-700"
            >
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">{badge.name}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{badge.description}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Próximas conquistas */}
      {earnedBadges.length < badges.length && (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-navy-700">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Próximas Conquistas:</h4>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            {badges
              .filter(b => !earnedBadges.find(e => e.id === b.id))
              .slice(0, 2)
              .map((badge) => (
                <motion.div
                  key={badge.id}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-navy-700 rounded-lg opacity-50"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{badge.name}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{badge.description}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default BadgesDisplay;
