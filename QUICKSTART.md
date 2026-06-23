# 🌱 EcoWaste Manager - QUICKSTART

## 🚀 Comece em 3 Minutos

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Iniciar Servidor
```bash
npm run dev
```

### 3️⃣ Acessar a Aplicação
```
http://localhost:5173
```

---

## 🔐 Credenciais de Demonstração

```
Email:    admin@ecowaste.com
Senha:    qualquer senha
```

---

## 📱 Páginas Disponíveis

| URL | Descrição |
|-----|-----------|
| `/` | Home - Landing page profissional |
| `/about` | Sobre - Informações do projeto |
| `/login` | Login - Autenticação |
| `/dashboard` | Dashboard - Painel executivo (protegido) |
| `/waste-records` | Registros - Gestão de desperdício (protegido) |

---

## 🎯 Próximas Ações

### Curto Prazo (1-2 semanas)
1. [ ] Integrar Firebase Firestore
2. [ ] Implementar autenticação Firebase
3. [ ] Adicionar gráficos avançados
4. [ ] Criar painel administrativo

### Médio Prazo (1-2 meses)
1. [ ] Implementar relatórios (PDF/Excel)
2. [ ] Sistema de metas e alertas
3. [ ] Análises de impacto ambiental
4. [ ] PWA e offline mode

### Longo Prazo (3+ meses)
1. [ ] Inteligência Artificial
2. [ ] Integração Google Sheets
3. [ ] Mobile app nativa
4. [ ] Multi-tenancy para escala

---

## 📚 Documentação Completa

- **README.md** - Documentação principal
- **PROJECT_STATUS.md** - Status detalhado do projeto
- **tailwind.config.js** - Configuração de cores e temas
- **vite.config.js** - Configuração de build

---

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot reload

# Build
npm run build            # Build para produção
npm run preview          # Pré-visualiza build

# Qualidade (futuros)
npm run lint            # Lint de código
npm run test            # Testes unitários
```

---

## 🎨 Customizações Fáceis

### Mudar Cores Principais
Edite `tailwind.config.js`:
```javascript
colors: {
  cyan: { 400: '#38BDF8' },  // Cor principal
  navy: { 900: '#0F172A' },  // Cor secundária
}
```

### Mudar Tema Padrão
Edite `src/context/AppContext.jsx`:
```javascript
const [theme, setTheme] = useState('dark'); // light ou dark
```

### Adicionar Nova Página
1. Crie `src/pages/MinhaPage.jsx`
2. Exporte component default
3. Adicione rota em `src/App.jsx`

---

## 🔥 Features Exclusivas

✨ **Temas Claro/Escuro**
- Switch automático no AppContext
- LocalStorage persistence
- Tailwind dark: classes

🎬 **Animações Suaves**
- Framer Motion integrado
- Transições de página
- Hover effects

📱 **Responsivo Total**
- Mobile first design
- Breakpoints Tailwind
- Touch-friendly

🔐 **Segurança**
- Rotas protegidas
- Context API auth
- Sessão persistente

🎯 **Dados Mock**
- Dados realistas pré-configurados
- Fácil substituição por API
- Estrutura pronta para Firebase

---

## 🚀 Deploy Automático

### GitHub Pages
```bash
git push origin main
# GitHub Actions faz deploy automaticamente
```

### Vercel
```bash
vercel
# Siga os prompts
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 📊 Performance

- ✅ Build size: 394KB (gzipped: 123KB)
- ✅ HTML: 0.47KB
- ✅ CSS: 28.48KB (gzipped: 5.26KB)
- ✅ Lighthouse: 90+ (target)

---

## 🐛 Troubleshooting

### Porta 5173 já em uso
```bash
npm run dev -- --port 3000
```

### Cache de node_modules
```bash
rm -r node_modules
npm install
```

### Build falha
```bash
rm -r dist
npm run build
```

---

## 📞 Suporte

Para questões sobre:
- **Instalação**: Veja README.md
- **Firebase**: Firebase Console docs
- **Tailwind**: tailwindcss.com
- **React**: react.dev
- **Vite**: vitejs.dev

---

## ✅ Antes de Deploy

1. [ ] Variáveis de ambiente configuradas
2. [ ] Build testado localmente
3. [ ] Temas claro/escuro testados
4. [ ] Responsividade verificada
5. [ ] Links internos funcionando
6. [ ] Autenticação mock testada

---

## 🎉 Você está pronto!

A plataforma está funcional e pronta para:
- ✅ Apresentação em projetos
- ✅ Desenvolvimento adicional
- ✅ Integração com backend
- ✅ Deploy para produção

**Divirta-se desenvolvendo! 🚀**

---

**Desenvolvido por Adrian Resende**
*Transformando dados em redução de desperdício.*
