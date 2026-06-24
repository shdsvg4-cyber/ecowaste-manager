# 📚 Guia Administrativo - EcoWaste Manager

## 🔐 Sistema de Autenticação

O EcoWaste Manager utiliza um sistema de dois níveis de autenticação:

### 1. **Admin (Administrador)**
- Responsável por aprovar registros de alunos
- Define metas de desperdício para cada aluno
- Visualiza dados agregados de todas as turmas
- Gerencia configurações do sistema

### 2. **Student (Aluno)**
- Se registra na plataforma
- Aguarda aprovação do administrador
- Recebe uma senha temporária
- Acessa seu dashboard pessoal
- Visualiza seu progresso e meta individual

---

## 🚀 Guia Rápido de Início

### **Primeiro Acesso (Admin)**

1. **Abra a aplicação** → clique em "Admin"
2. **Login padrão:**
   - Email: `admin@ecowaste.local`
   - Senha: `admin123`
3. **⚠️ IMPORTANTE:** Mude a senha padrão após o primeiro acesso

### **Como Trocar Senha do Admin**

Use o console do navegador (F12) e execute:

```javascript
import { updateAdminPassword } from './src/utils/AdminInit.js';
updateAdminPassword('admin@ecowaste.local', 'admin123', 'sua_nova_senha');
```

Ou edite o arquivo `src/utils/AdminInit.js` e mude a senha padrão na variável `defaultAdmin`.

---

## 👥 Fluxo de Aprovação de Alunos

### **Passo 1: Aluno se Registra**
```
Aluno clica em "Registrar" 
→ Preenche: Email, Nome, Classe
→ Recebe uma senha temporária
→ Solicitação fica pendente
```

### **Passo 2: Admin Aprova**
```
Admin acessa o painel administrativo
→ Clica em "Solicitações" (N registros pendentes)
→ Vê email, nome e classe do aluno
→ Clica em "Aprovar"
→ Aluno recebe status aprovado
```

### **Passo 3: Aluno Faz Login**
```
Aluno clica em "Entrar"
→ Usa email + senha temporária
→ Acessa seu dashboard pessoal
→ Pode criar um papel com suas credenciais
```

---

## 🎯 Painel Administrativo - Guia Completo

### **Aba: Solicitações**
Mostra todos os registros pendentes de alunos esperando aprovação.

**Informações exibidas:**
- Nome do aluno
- Email
- Classe (turma)
- Data do registro
- **Senha temporária** (importante: o aluno deve anotar!)

**Ações disponíveis:**
- ✅ **Aprovar**: Aluno pode fazer login
- ❌ **Rejeitar**: Solicitar recadastra-se

### **Aba: Alunos**
Lista todos os alunos já aprovados.

**Colunas:**
| Nome | Email | Classe | Total Desperdiçado (g) | Meta (g) | Ação |
|------|-------|--------|------------------------|-----------| ----|
| João | joão@... | 9º Ano | 250 | 1000 | Editar Meta |

**Ação: Editar Meta**
Clique em "Editar Meta" para definir o limite máximo de desperdício.

### **Aba: Metas**
Gerenciar metas individuais de cada aluno.

**Como funciona:**
1. Cada aluno tem uma meta individual (em gramas)
2. Aluno vê seu progresso em % no dashboard
3. Verde: ≤50% (indo bem!) ✅
4. Amarelo: 51-80% (cuidado!) ⚠️
5. Vermelho: >80% (ultrapassou!) ❌

### **Aba: Configurações**
Mais opções em breve...

---

## 📊 Integração com Google Sheets

O sistema sincroniza automaticamente com sua planilha Google Sheets.

### **Como Funciona**

1. **Adicione dados na planilha** com as seguintes colunas:
   - `Email`: email do aluno
   - `Nome`: nome do aluno
   - `Classe`: turma (ex: 9º Ano)
   - `Desperdício (g)`: quantidade em gramas
   - `Produto`: item desperdiçado
   - `Motivo`: razão do desperdício
   - `Data`: data do registro

2. **O sistema busca dados automaticamente**:
   - Cache local de 24 horas
   - Sincronização ao clicar em "Sincronizar"
   - Dados salvos no localStorage

3. **Dados sincronizados aparecem no dashboard do aluno**

### **URL da Planilha Configurada**

```
https://docs.google.com/spreadsheets/d/1tVgkcyGEnEhWcmj-DV6Zus8e_RmVirsRJg2MoRiq6lw
```

---

## 🔒 Segurança

### **Armazenamento de Dados**
- Todas as senhas são codificadas em Base64 (demo)
- **Em produção**: Use bcrypt.js ou similiar
- Dados armazenados em `localStorage` (navegador)
- **Recomendação**: Use Firebase Authentication em produção

### **Validações**
- Email único por aluno
- Senha mínima de 6 caracteres
- Campos obrigatórios validados
- Controle de acesso por role (Admin/Aluno)

### **Backup de Dados**
Para fazer backup dos dados locais:

```javascript
// No console do navegador
const data = {
  registrations: localStorage.getItem('ecowaste_registration_requests'),
  students: localStorage.getItem('ecowaste_students'),
  goals: localStorage.getItem('ecowaste_student_goals'),
  admins: localStorage.getItem('ecowaste_admins')
};
console.log(JSON.stringify(data, null, 2));
```

---

## 🎓 Cenários de Uso

### **Cenário 1: Configuração Inicial**

```
1. Você faz login como admin (admin@ecowaste.local)
2. Compartilha o link da aplicação com os alunos
3. Alunos se registram (nome, email, classe)
4. Você aprova cada solicitação
5. Alunos recebem senha temporária
6. Alunos fazem login e veem seu dashboard
```

### **Cenário 2: Registrar Desperdício**

```
1. Professor/Admin registra desperdício na planilha Google Sheets
2. Adiciona: aluno, quantidade, motivo, data
3. Sistema sincroniza automaticamente
4. Aluno vê no seu dashboard: "Você desperdiçou 250g hoje"
5. Progresso é atualizado em tempo real
```

### **Cenário 3: Competição Entre Turmas**

```
1. Define metas diferentes por turma:
   - 9º Ano: 500g/aluno
   - 8º Ano: 600g/aluno
2. Alunos competem para desperdiçar menos
3. Dashboard mostra ranking das turmas
4. Melhor turma recebe reconhecimento
```

---

## 📱 Acesso Mobile

O site é totalmente responsivo:

- ✅ Funciona em smartphones
- ✅ Funciona em tablets
- ✅ Funciona em desktops
- ✅ Funciona offline (PWA)

### **App Instalável (PWA)**

Clique em "Instalar" no navegador para ter um atalho na tela inicial.

---

## 🆘 Troubleshooting

### **Problema: "Email ou senha inválido"**
- Verifique se o email está correto
- Admin: use `admin@ecowaste.local`
- Aluno: use a senha temporária fornecida

### **Problema: Admin account não encontrado**
- Abra o console (F12)
- Execute: `localStorage.getItem('ecowaste_admins')`
- Se for vazio, recarregue a página

### **Problema: Dados não sincronizam da planilha**
- Verifique se a planilha é **pública**
- URL da planilha deve ter `:publish` ou `:htmlview`
- Limpe cache: `localStorage.clear()` (cuidado!)

### **Problema: Perdi a senha**
- Abra o console (F12)
- Execute o comando de troca de senha acima

---

## 💾 Comandos Úteis (Console)

### **Ver todos os dados salvos:**
```javascript
console.table(JSON.parse(localStorage.getItem('ecowaste_students') || '[]'));
console.table(JSON.parse(localStorage.getItem('ecowaste_registration_requests') || '[]'));
console.table(JSON.parse(localStorage.getItem('ecowaste_student_goals') || '{}'));
```

### **Limpar tudo e recomeçar:**
```javascript
localStorage.clear();
location.reload();
```

### **Exportar dados para Excel/CSV:**
```javascript
const students = JSON.parse(localStorage.getItem('ecowaste_students') || '[]');
const csv = students.map(s => `${s.name},${s.email},${s.classroom}`).join('\n');
console.log(csv);
```

---

## 📞 Suporte

### **Para dúvidas:**
- Verifique este guia
- Abra o console (F12) para ver erros
- Exporte dados se precisar fazer backup

### **Desenvolvido por:**
Adrian Resende © 2024

---

## ✅ Checklist de Configuração

- [ ] Faça login como admin
- [ ] Mude a senha padrão
- [ ] Configure a planilha Google Sheets
- [ ] Compartilhe o link com alunos
- [ ] Aprove os primeiros registros
- [ ] Defina metas por turma
- [ ] Teste o login de um aluno
- [ ] Teste a sincronização de dados
- [ ] Configure backup de dados

---

**Última atualização:** 24 de junho de 2024
