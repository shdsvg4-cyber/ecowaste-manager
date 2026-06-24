import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, Trophy, Star } from 'lucide-react';
import { quizQuestions, dailyChallenges } from '../data/gamification';

export function MiniGameModal({ isOpen, onClose, studentData }) {
  const [gameType, setGameType] = useState(null); // 'quiz' or 'challenge'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  if (!isOpen) return null;

  const handleAnswerClick = (index) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    const isCorrect = index === quizQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setGameType(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    onClose();
  };

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-navy-800 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Star className="text-white" size={28} />
            <div>
              <h2 className="text-white font-bold text-xl">Quiz Sustentável</h2>
              <p className="text-purple-100 text-sm">Questão {currentQuestion + 1} de {quizQuestions.length}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Score Bar */}
        <div className="bg-gray-100 dark:bg-navy-700 px-6 py-3 flex justify-between items-center border-b border-gray-200 dark:border-navy-600">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-yellow-500" />
            <span className="font-bold text-gray-900 dark:text-white">{score} pontos</span>
          </div>
          <div className="h-2 w-32 bg-gray-300 dark:bg-navy-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              className="h-full bg-purple-500"
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {question.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerClick(idx)}
                disabled={answered}
                className={`w-full p-4 rounded-lg font-semibold transition-all ${
                  selectedAnswer === idx
                    ? isCorrect
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : 'bg-red-500 text-white shadow-lg'
                    : answered && idx === question.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 dark:bg-navy-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-navy-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {answered && (
                    <span className="text-lg">
                      {selectedAnswer === idx && (isCorrect ? '✅' : '❌')}
                      {idx === question.correct && selectedAnswer !== idx && '✅'}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-6 ${
                isCorrect
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
              }`}
            >
              <p className="font-semibold mb-2">{isCorrect ? '✅ Correto!' : '📚 Aprenda:'}</p>
              <p>{question.explanation}</p>
            </motion.div>
          )}

          {/* Next Button */}
          {answered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNextQuestion}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
              <ChevronRight size={20} />
            </motion.button>
          )}
        </div>

        {/* Results */}
        {currentQuestion === quizQuestions.length - 1 && answered && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-navy-800 p-8 rounded-xl text-center"
            >
              <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Concluído!</h3>
              <p className="text-3xl font-bold text-purple-500 mb-4">{score} pontos</p>
              <p className="text-gray-600 dark:text-gray-400">
                {score >= 80 ? 'Excelente! Você é um expert em sustentabilidade!' : 'Muito bom! Continue aprendendo!'}
              </p>
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default MiniGameModal;
