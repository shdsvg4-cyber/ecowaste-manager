// Mini-Game: Waste Reduction Challenge
// Interactive game to engage students in sustainability

export const quizQuestions = [
  {
    id: 1,
    question: "Qual é o percentual de alimentos desperdiçados globalmente que poderiam alimentar pessoas com fome?",
    options: ["25%", "50%", "75%", "90%"],
    correct: 1, // 50%
    explanation: "Surpreendente, mas verdadeiro! Aproximadamente 50% do desperdício global poderia alimentar 1 bilhão de pessoas."
  },
  {
    id: 2,
    question: "Quanto tempo uma pessoa poderia ser alimentada com os 10% de alimentos que você pode poupar em um ano?",
    options: ["1 semana", "2 semanas", "1 mês", "3 meses"],
    correct: 1, // 2 semanas
    explanation: "Uma redução de 10% em sua pegada alimentar equivale a 9,4kg de alimentos por pessoa - suficiente para 2 semanas!"
  },
  {
    id: 3,
    question: "Qual gás está mais associado ao desperdício de alimentos em aterros?",
    options: ["Oxigênio", "Metano", "Nitrogênio", "Dióxido de carbono"],
    correct: 1, // Metano
    explanation: "O metano é 28 vezes mais potente que o CO₂ como gás de efeito estufa. Aterros sanitários são grandes emissores."
  },
  {
    id: 4,
    question: "Quanto uma família pode economizar anualmente reduzindo desperdício de alimentos?",
    options: ["R$ 50", "R$ 500", "R$ 2.000", "R$ 5.000"],
    correct: 2, // R$ 2.000
    explanation: "Famílias podem economizar de R$ 1.500 a R$ 2.500 por ano com gestão eficiente de alimentos."
  },
  {
    id: 5,
    question: "Que percentual de frutas e vegetais é desperdiçado por parecer imperfeito?",
    options: ["15%", "25%", "40-50%", "70%"],
    correct: 2, // 40-50%
    explanation: "Alimentos imperfeitos são perfeitamente seguros e nutritivos, mas são frequentemente descartados apenas pela aparência."
  },
  {
    id: 6,
    question: "Quantas emissões globais de gases de efeito estufa são causadas pelo desperdício de alimentos?",
    options: ["2%", "5%", "8%", "15%"],
    correct: 2, // 8%
    explanation: "O desperdício de alimentos é responsável por cerca de 8% das emissões globais de GEE."
  },
  {
    id: 7,
    question: "Qual é a melhor maneira de reduzir desperdício no dia a dia?",
    options: ["Comprar menos frequentemente", "Planejar refeições", "Usar sempre o freezer", "Comprar em quantidade"],
    correct: 1, // Planejar refeições
    explanation: "Planejar refeições reduz desperdício em até 50%, pois você compra apenas o necessário."
  },
  {
    id: 8,
    question: "Alimentos após a data de validade sempre devem ser descartados?",
    options: ["Sim, é perigoso", "Não, use seus sentidos", "Apenas certos tipos", "Depende da embalagem"],
    correct: 1, // Não, use seus sentidos
    explanation: "Muitos alimentos são seguros dias após a data de validade. Veja, cheiro e prove antes de descartar!"
  },
  {
    id: 9,
    question: "Quanto de água doce é consumida produzindo alimentos que serão desperdiçados?",
    options: ["10%", "15%", "20%", "25%"],
    correct: 3, // 25%
    explanation: "Um quarto da água doce global é usada para produzir alimentos que acabam sendo desperdiçados."
  },
  {
    id: 10,
    question: "Qual é o impacto real de uma escola reduzindo desperdício em 20%?",
    options: ["500kg/ano", "1000kg/ano", "5000kg/ano", "10000kg/ano"],
    correct: 0, // 500kg/ano
    explanation: "Apenas 10 alunos reduzindo desperdício em 20% economizam 500kg de alimentos por ano!"
  }
];

export const dailyChallenges = [
  {
    id: 1,
    name: "Desafio Zero Desperdício",
    description: "Passe um dia inteiro sem desperdiçar nenhum alimento",
    reward: 50,
    icon: "🎯"
  },
  {
    id: 2,
    name: "Dia do Prato Limpo",
    description: "Coma tudo que servir - nada no lixo!",
    reward: 30,
    icon: "🍽️"
  },
  {
    id: 3,
    name: "Receita Criativa",
    description: "Crie uma refeição com sobras de outros dias",
    reward: 40,
    icon: "👨‍🍳"
  },
  {
    id: 4,
    name: "Educador Sustentável",
    description: "Ensine um colega sobre redução de desperdício",
    reward: 35,
    icon: "🎓"
  },
  {
    id: 5,
    name: "Plantação Micro",
    description: "Use cascas/sementes para iniciar um pequeno cultivo",
    reward: 45,
    icon: "🌱"
  },
  {
    id: 6,
    name: "Compostador",
    description: "Compostagem caseira de resíduos alimentares",
    reward: 60,
    icon: "♻️"
  },
  {
    id: 7,
    name: "Leitor da Natureza",
    description: "Aprenda e pratique técnicas de armazenagem inteligente",
    reward: 25,
    icon: "📚"
  },
  {
    id: 8,
    name: "Influenciador Verde",
    description: "Influencie 3 colegas a reduzir desperdício",
    reward: 50,
    icon: "📱"
  }
];

export const badges = [
  {
    id: 1,
    name: "Iniciante Sustentável",
    description: "Complete seu primeiro desafio",
    icon: "🌿",
    requirement: 1
  },
  {
    id: 2,
    name: "Protetor de Alimentos",
    description: "Reduza 50kg de desperdício",
    icon: "🛡️",
    requirement: 50000
  },
  {
    id: 3,
    name: "Herói Verde",
    description: "Conquiste 500 pontos",
    icon: "🦸",
    requirement: 500
  },
  {
    id: 4,
    name: "Mestre da Sustentabilidade",
    description: "Complete 10 desafios diferentes",
    icon: "👑",
    requirement: 10
  },
  {
    id: 5,
    name: "Guardião do Planeta",
    description: "Mantenha 30 dias sem ultrapassar a meta",
    icon: "🌍",
    requirement: 30
  },
  {
    id: 6,
    name: "Enciclopédia Verde",
    description: "Acerte 8 perguntas no quiz",
    icon: "📖",
    requirement: 8
  }
];

export const calculateGamePoints = (wasteReduced) => {
  // 1kg = 100 pontos
  return Math.floor((1000 - wasteReduced) / 10);
};

export const getStreakBonus = (daysWithoutExceeding) => {
  // Bônus a cada 7 dias consecutivos
  return Math.floor(daysWithoutExceeding / 7) * 50;
};
