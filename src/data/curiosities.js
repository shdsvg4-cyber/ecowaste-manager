// Database of Curiosities and Educational Content
// Motivational facts about food waste and sustainability

export const curiosities = [
  {
    id: 1,
    title: "Desperdício Global",
    text: "Aproximadamente 1,3 bilhão de toneladas de alimentos são desperdiçadas anualmente no mundo.",
    category: "global",
    icon: "🌍"
  },
  {
    id: 2,
    title: "Recursos Desperdiçados",
    text: "Quando desperdiçamos comida, desperdiçamos também toda a água, energia e trabalho usados para produzi-la.",
    category: "recursos",
    icon: "💧"
  },
  {
    id: 3,
    title: "Impacto Financeiro",
    text: "Uma pessoa desperdiça, em média, 94kg de comida por ano. Isso custa aproximadamente R$ 2.000,00 por família anualmente.",
    category: "financeiro",
    icon: "💰"
  },
  {
    id: 4,
    title: "Redução de 10%",
    text: "Se você reduzir seu desperdício em apenas 10%, já estará ajudando a salvar 9,4kg de alimentos! Isso é suficiente para alimentar uma pessoa durante quase 2 semanas!",
    category: "impacto",
    icon: "🎯"
  },
  {
    id: 5,
    title: "CO₂ e Clima",
    text: "O desperdício de alimentos gera aproximadamente 8% das emissões globais de gases de efeito estufa. Reduzir desperdício é lutar contra o aquecimento global.",
    category: "clima",
    icon: "🔥"
  },
  {
    id: 6,
    title: "Fome no Mundo",
    text: "Enquanto 1/3 dos alimentos produzidos são desperdiçados, aproximadamente 828 milhões de pessoas sofrem de fome no mundo.",
    category: "social",
    icon: "🍽️"
  },
  {
    id: 7,
    title: "Biodiversidade",
    text: "A produção de alimentos desperdiçados consome 25% da água doce global. Proteger alimentos é proteger nossos recursos naturais.",
    category: "ambiente",
    icon: "🌱"
  },
  {
    id: 8,
    title: "Compostagagem",
    text: "Resíduos alimentares podem ser transformados em adubo fértil através da compostagagem. 1kg de compostagem pode nutrir o solo para plantas por semanas!",
    category: "reciclagem",
    icon: "♻️"
  },
  {
    id: 9,
    title: "Alimentação Consciente",
    text: "Ao planejar refeições, você reduz o desperdício em até 50%. Compre apenas o que vai usar!",
    category: "dicas",
    icon: "📋"
  },
  {
    id: 10,
    title: "Frutas e Vegetais",
    text: "40-50% de frutas e vegetais são desperdiçados porque parecem imperfeitos, apesar de serem perfeitamente comestíveis e nutritivos.",
    category: "produção",
    icon: "🍎"
  },
  {
    id: 11,
    title: "Economia Familiar",
    text: "Uma família pode economizar até R$ 200,00 por mês apenas reduzindo o desperdício de alimentos.",
    category: "financeiro",
    icon: "🏠"
  },
  {
    id: 12,
    title: "Datas de Validade",
    text: "Muitos alimentos podem ser consumidos dias após a data de validade. Confie seus sentidos: veja, cheiro e prove antes de descartar!",
    category: "dicas",
    icon: "📅"
  },
  {
    id: 13,
    title: "Lixo Tóxico",
    text: "Alimentos em aterros sanitários geram metano, um gás de efeito estufa 28 vezes mais potente que o CO₂.",
    category: "clima",
    icon: "⚠️"
  },
  {
    id: 14,
    title: "Educação Muda Tudo",
    text: "Escolas que implementam programas de redução de desperdício conseguem reduzir lixo em até 75%.",
    category: "educação",
    icon: "🎓"
  },
  {
    id: 15,
    title: "Desafio Diário",
    text: "Você consegue fazer um dia inteiro SEM desperdiçar nenhum alimento? Tente! Seu corpo e o planeta agradecem.",
    category: "desafio",
    icon: "💪"
  },
  {
    id: 16,
    title: "Reutilização Criativa",
    text: "Pão velho pode virar pudim, arroz pode virar bolinho. Criatividade na cozinha = zero desperdício!",
    category: "criatividade",
    icon: "👨‍🍳"
  },
  {
    id: 17,
    title: "Pequenas Ações",
    text: "10 alunos reduzindo desperdício em 20% = economia de 500kg de comida por ano. Imagine se toda a escola participasse!",
    category: "coletivo",
    icon: "👥"
  },
  {
    id: 18,
    title: "Lições de Vida",
    text: "Respeitar alimentos é respeitar a natureza, os agricultores e suas próprias origens. Educação sustentável começa aqui.",
    category: "valores",
    icon: "❤️"
  },
  {
    id: 19,
    title: "Números que Impressionam",
    text: "Se reduzirmos o desperdício global em 50%, poderíamos alimentar 1 bilhão de pessoas adicionais.",
    category: "impacto",
    icon: "🔢"
  },
  {
    id: 20,
    title: "Você é um Herói",
    text: "Cada grama de alimento que você não desperdiça é um passo para um mundo mais justo e sustentável. Você importa!",
    category: "motivação",
    icon: "🦸"
  }
];

export const getCuriosityByDay = () => {
  const today = new Date().getDate();
  return curiosities[today % curiosities.length];
};

export const getRandomCuriosity = () => {
  return curiosities[Math.floor(Math.random() * curiosities.length)];
};

export const getCuriositiesByCategory = (category) => {
  return curiosities.filter(c => c.category === category);
};
