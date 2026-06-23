# 🌱 EcoWaste Manager - Plataforma Corporativa de Gestão de Desperdício Alimentar

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-Ready-FFA500?logo=firebase)

> **Transformando dados em redução de desperdício.**

Uma plataforma web empresarial completa para monitoramento, gestão, análise, auditoria e redução do desperdício alimentar. Desenvolvida com tecnologias modernas e compatível com hospedagem estática via GitHub Pages.

---

## 📋 Sumário

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
- [Deploy](#deploy)
- [Documentação](#documentação)
- [Roadmap](#roadmap)

---

## ✨ Características

### 🎯 Funcionalidades Principais

- **Dashboard Executivo**: Visualização em tempo real de KPIs e métricas
- **Registro de Desperdício**: Sistema completo para registrar e rastrear desperdício alimentar
- **Gestão Multi-Unidade**: Suporte para matriz, filiais e múltiplos setores
- **Análises Avançadas**: Relatórios, gráficos e Business Intelligence
- **Metas e Alertas**: Sistema inteligente de alertas e monitoramento de metas
- **Impacto Ambiental**: Cálculo de CO₂ evitado e impacto sustentável
- **Auditoria Completa**: Registro de todas as ações realizadas no sistema
- **Responsividade Total**: Compatibilidade com smartphones, tablets e desktops

### 🎨 Design e UX

- Design corporativo moderno e premium
- Temas claro e escuro
- Animações suaves com Framer Motion
- Interface intuitiva e responsiva
- Componentes reutilizáveis
- Modo claro/escuro automático

### 🔐 Segurança

- Autenticação com Firebase
- Controle de acesso baseado em perfis (RBAC)
- Validação de formulários
- Sanitização de entradas
- Rotas protegidas
- Sessão persistente com LocalStorage

---

## 📦 Requisitos

- **Node.js** 18+
- **npm** 9+
- **Git**
- Conta Firebase (opcional, para dados em produção)

---

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/ecowaste-manager.git
cd ecowaste-manager
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Nota**: Inicialmente, o sistema funciona com dados mockados. As credenciais do Firebase são opcionais.

### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

---

## ⚙️ Configuração

### Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative Firestore Database
4. Configure Firebase Authentication (Email/Password)
5. Copie as credenciais para `.env.local`
6. Configure as regras de segurança do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /waste_records/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    match /goals/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
  }
}
```

### Tailwind CSS

O Tailwind CSS já está configurado. Personalize em `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      cyan: { /* cores personalizadas */ },
      navy: { /* cores personalizadas */ }
    }
  }
}
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ProtectedRoute.jsx
│   ├── NotificationContainer.jsx
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   └── ...
├── layouts/            # Layouts compartilhados
├── services/           # Serviços e API
├── hooks/              # Custom hooks
├── context/            # Context API
│   ├── AuthContext.jsx
│   └── AppContext.jsx
├── firebase/           # Configuração Firebase
│   └── config.js
├── assets/             # Imagens e ícones
├── utils/              # Funções utilitárias
├── types/              # Tipos e constantes
├── data/               # Dados mockados
├── styles/             # Estilos globais
└── App.jsx             # Componente raiz
```

---

## 👥 Perfis de Acesso

| Perfil | Permissões |
|--------|------------|
| **Master Admin** | Acesso total ao sistema |
| **Admin** | Gestão de usuários, unidades, configurações |
| **Gestor** | Gestão de registros, metas, relatórios |
| **Supervisor** | Criação de registros, visualização de relatórios |
| **Operador** | Criação de registros |
| **Visitante** | Visualização de relatórios apenas |

---

## 📊 Estrutura de Dados

### Usuários
```javascript
{
  id: string,
  email: string,
  name: string,
  role: 'master_admin' | 'admin' | 'manager' | 'supervisor' | 'operator' | 'visitor',
  unit: string,
  active: boolean,
  createdAt: timestamp
}
```

### Registros de Desperdício
```javascript
{
  id: string,
  date: string,
  time: string,
  unit: string,
  sector: string,
  category: string,
  product: string,
  quantity: number,
  weight: number,
  value: number,
  reason: string,
  responsible: string,
  observations: string,
  photoUrl?: string,
  createdAt: timestamp
}
```

### Metas
```javascript
{
  id: string,
  unit: string,
  period: string,
  targetValue: number,
  currentValue: number,
  status: 'on_track' | 'exceeded' | 'behind',
  createdAt: timestamp
}
```

---

## 🎬 Uso

### Credenciais de Demonstração

- **Email**: admin@ecowaste.com
- **Senha**: qualquer senha (demo)

### Funcionalidades Principais

#### 1. Dashboard
- Visualize KPIs em tempo real
- Acompanhe metas e alertas
- Acesse últimos registros

#### 2. Registrar Desperdício
- Preencha formulário com dados do desperdício
- Anexe foto como evidência
- Classifique por categoria e motivo

#### 3. Visualizar Relatórios
- Gráficos de tendências
- Comparação por período
- Exportar em PDF/Excel

#### 4. Gerenciar Metas
- Defina metas mensais
- Acompanhe progresso
- Receba alertas

---

## 🌐 Deploy

### GitHub Pages

1. **Configurar Repositório**
```bash
git remote add origin https://github.com/seu-usuario/ecowaste-manager.git
git branch -M main
git push -u origin main
```

2. **Configurar GitHub Actions**

Crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. **Ativar GitHub Pages**
   - Vá a Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

---

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Pré-visualizar build
npm run preview

# Lint (se configurado)
npm run lint
```

### Adicionar Novas Páginas

1. Crie arquivo em `src/pages/`
```javascript
export function NovaPage() {
  return <div>Conteúdo</div>;
}
export default NovaPage;
```

2. Adicione rota em `src/App.jsx`
```javascript
<Route path="/nova-page" element={<NovaPage />} />
```

### Adicionar Novos Componentes

1. Crie arquivo em `src/components/`
2. Exporte como default
3. Importe onde necessário

---

## 📚 Documentação Completa

### Componentes Principais

- **ProtectedRoute**: Protege rotas que requerem autenticação
- **NotificationContainer**: Sistema de notificações toast
- **Dashboard**: Página inicial autenticada

### Hooks Customizados

- `useAuth()`: Acesso ao contexto de autenticação
- `useApp()`: Acesso ao contexto da aplicação
- `useNotification()`: Disparar notificações

### Contextos

- **AuthContext**: Gerencia autenticação e usuário
- **AppContext**: Estado global (tema, idioma, notificações)

---

## 🗺️ Roadmap

### Fase Atual (MVP)
- [x] Setup projeto
- [x] Autenticação básica
- [x] Dashboard
- [x] Registro de desperdício
- [ ] Gráficos avançados
- [ ] Relatórios PDF/Excel

### Próximas Fases
- [ ] Integração com Firebase
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Inteligência Artificial
- [ ] Integração Google Sheets
- [ ] Mobile app nativa

---

## 📊 Tecnologias

- **React 18**: Biblioteca UI
- **Vite 8**: Build tool
- **Tailwind CSS 3**: Estilo
- **Firebase**: Backend
- **Framer Motion**: Animações
- **Chart.js**: Gráficos
- **React Router**: Roteamento
- **Lucide React**: Ícones

---

## 🔒 Segurança

- Validação de entrada em todos os formulários
- Sanitização de dados
- Rotas protegidas
- Autenticação Firebase
- HTTPS obrigatório em produção
- Content Security Policy

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👤 Autor

**Adrian Resende**

- GitHub: [@adrianresende](https://github.com/adrianresende)
- Email: contact@adrianresende.dev

---

## 🙏 Agradecimentos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

## 📞 Suporte

Para suporte, envie um email para support@ecowaste.dev ou abra uma issue no GitHub.

---

**Desenvolvido por Adrian Resende** 🌱

*Transformando dados em redução de desperdício.*
