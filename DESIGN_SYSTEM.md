# 🎨 EcoWaste Manager - Design System

## 📋 Paleta de Cores

### Cores Principais

```
Primária:    #38BDF8 (Cyan-400)
Secundária:  #0F172A (Navy-900)
Destaque:    #22C55E (Green-500)
```

### Cores Estendidas

#### Cyan (Primária)
```
50:  #f0f9fe
100: #e0f2fe
200: #bae6fd
300: #7dd3fc
400: #38bdf8  ← Principal
500: #06b6d4
600: #0891b2
700: #0e7490
800: #155e75
900: #164e63
```

#### Navy (Secundária)
```
50:  #f8f9fc
100: #f0f4f8
200: #d9e2ec
300: #c3cfe2
400: #aab8cc
500: #919bbb
600: #6d7e99
700: #4a5578
800: #2d3856
900: #0f172a  ← Secundária
```

#### Accent Colors
```
Success:  #22C55E (Green-500)
Warning:  #EAB308 (Yellow-400)
Error:    #EF4444 (Red-500)
Info:     #3B82F6 (Blue-500)
```

---

## 🎯 Typography

### Font Family
```
Primária:  Inter, system-ui, sans-serif
Heading:   Inter, system-ui, sans-serif
Mono:      Fira Code, Courier New, monospace
```

### Tamanhos
```
h1: 56px / 3.5rem (mobile: 36px)
h2: 32px / 2rem
h3: 24px / 1.5rem
h4: 20px / 1.25rem
p:  16px / 1rem
sm: 14px / 0.875rem
xs: 12px / 0.75rem
```

### Pesos
```
Light:   300
Regular: 400
Medium:  500
Semi:    600
Bold:    700
Extra:   800
```

---

## 📐 Espaçamento

### Escala
```
0:  0px
1:  0.25rem (4px)
2:  0.5rem  (8px)
3:  0.75rem (12px)
4:  1rem    (16px)
6:  1.5rem  (24px)
8:  2rem    (32px)
12: 3rem    (48px)
16: 4rem    (64px)
20: 5rem    (80px)
```

---

## 🎭 Componentes Principais

### Button Variants

#### btn-primary
```
Background: Cyan-400
Text:       White
Hover:      Cyan-500
Active:     scale(0.95)
```

#### btn-secondary
```
Background: Gray-100 / Navy-700 (dark)
Text:       Navy-900 / White (dark)
Hover:      Gray-200 / Navy-600 (dark)
```

#### btn-ghost
```
Background: transparent
Text:       Cyan-400
Hover:      Cyan-50 / Navy-700 (dark)
```

### Card Design
```
Background: White / Navy-800 (dark)
Border:     Gray-200 / Navy-700 (dark)
Radius:     8px
Shadow:     sm (0 1px 2px)
Hover:      shadow-md
```

### Input Fields
```
Background: White / Navy-800 (dark)
Border:     Gray-300 / Navy-600 (dark)
Focus:      ring-2 ring-cyan-400
Radius:     8px
Padding:    12px (x: 12px, y: 8px)
```

---

## 🌙 Modo Escuro

### Implementação
```javascript
// Tailwind dark: classes
<div className="bg-white dark:bg-navy-900">
  Content
</div>

// Toggle no AppContext
localStorage.setItem('ecowaste_theme', 'dark')
document.documentElement.classList.add('dark')
```

### Colors no Dark Mode
```
Background:  Navy-900 (#0F172A)
Text:        White (#FFFFFF)
Border:      Navy-700 (#1f2937)
Secondary:   Navy-800 (#1e293b)
```

---

## 🎬 Animações

### Transições Padrão
```
Duration: 200ms - 300ms
Easing:   ease-in-out
```

### Efeitos
```
Hover:     shadow-md, scale(1.05)
Active:    scale(0.95), opacity-75
Focus:     ring-2 ring-cyan-400
Loading:   spinner (1s linear infinite)
Float:     translateY(-20px) (3s ease-in-out)
```

---

## 📱 Breakpoints

```
Mobile:      < 640px
Tablet:      640px - 1024px  (md:)
Desktop:     1024px - 1280px (lg:)
Wide:        1280px - 1536px (xl:)
UltraWide:   > 1536px        (2xl:)
```

---

## 🔲 Shadows

```
sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)

glow:    0 0 20px rgba(56, 189, 248, 0.25)
glow-lg: 0 0 40px rgba(56, 189, 248, 0.35)
```

---

## 📊 Gradientes

### Hero
```
from-cyan-50 to-blue-50     (light)
from-navy-800 to-navy-900   (dark)
```

### Accent
```
from-cyan-400 to-blue-500
from-green-500 to-emerald-500
from-yellow-500 to-orange-500
```

---

## 🎯 Logo & Branding

### Logo
```
Name:    EcoWaste Manager
Icon:    Leaf (Lucide React)
Slogan:  Transformando dados em redução de desperdício
```

### Logo Colors
```
Icon:       Cyan-400
Text:       Cyan-400 (primary) / Navy-900 (secondary)
Background: Cyan-100 / Cyan-900/30 (dark)
```

---

## ♿ Acessibilidade

### ARIA Labels
```javascript
<button aria-label="Abrir menu">
  <Menu />
</button>
```

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-cyan-400
```

### Color Contrast
```
Primary Text on White:  Navy-900 (100% pass)
Primary on Cyan-400:    White (AAA level)
```

---

## 📐 Grid Layout

### Container
```
max-w-7xl (1280px)
padding: 1rem (mobile) - 2rem (desktop)
```

### Columns
```
1 col   (mobile, < 640px)
2 cols  (tablet, 640px - 1024px)
3+ cols (desktop, > 1024px)
gap:    24px (1.5rem)
```

---

## 🔔 Notification Styles

### Success
```
Background: Green-50 / Green-900/20
Border:     Green-200 / Green-700
Text:       Green-800 / Green-200
Icon:       CheckCircle
```

### Error
```
Background: Red-50 / Red-900/20
Border:     Red-200 / Red-700
Text:       Red-800 / Red-200
Icon:       AlertCircle
```

### Warning
```
Background: Yellow-50 / Yellow-900/20
Border:     Yellow-200 / Yellow-700
Text:       Yellow-800 / Yellow-200
Icon:       AlertCircle
```

### Info
```
Background: Blue-50 / Blue-900/20
Border:     Blue-200 / Blue-700
Text:       Blue-800 / Blue-200
Icon:       Info
```

---

## 🎪 Badges

```
Small:     px-2.5 py-0.5 text-xs
Medium:    px-3 py-1 text-sm
Large:     px-4 py-1.5 text-base

Colors: cyan, green, yellow, red, blue
```

---

## 📋 Checklist de Implementação

- [x] Paleta de cores definida
- [x] Typography configurada
- [x] Componentes base criados
- [x] Temas claro/escuro
- [x] Animações suaves
- [x] Responsividade
- [x] Acessibilidade básica
- [x] Documentação design system

---

**Padrão de Qualidade**: Enterprise / Corporate Premium

**Inspiração**: Power BI, Tableau, SAP Analytics, Microsoft Fabric

**Desenvolvido por Adrian Resende** 🎨
