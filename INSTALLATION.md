# 📦 Інструкція з встановлення

## Передумови

- Node.js версії 18 або вище
- npm або yarn

## Крок 1: Встановлення залежностей

```bash
cd latest
npm install
```

Це встановить усі необхідні пакети, включаючи:
- Next.js
- React 19
- shadcn-ui компоненти
- Tailwind CSS
- Radix UI примітиви

## Крок 2: Розташування файлів

Всі файли гри вже розташовані:
- ✅ `app/game.tsx` - Основний компонент гри
- ✅ `app/page.tsx` - Головна сторінка
- ✅ `components/ui/` - shadcn-ui компоненти
- ✅ `lib/utils.ts` - Утилітарні функції
- ✅ `public/logo/` - Логотипи кандидатів
- ✅ `public/photo/` - Фото кандидатів
- ✅ `public/media_logos/` - Логотипи медіа

## Крок 3: Запуск у режимі розробки

```bash
npm run dev
```

Гра буде доступна за адресою: **http://localhost:3000**

## Крок 4: Побудова для продакшену

```bash
npm run build
npm start
```

## 🎮 Перший запуск гри

1. Відкрийте http://localhost:3000 у браузері
2. Виберіть кандидата для представництва
3. Виберіть суперника (якщо потрібно)
4. Почніть проводити кампанію!

## ⚙️ Налаштування

### Зміна портуі

За замовчуванням сервер запускається на порту **3000**. Щоб змінити:

```bash
npm run dev -- -p 3001
```

### Налаштування Tailwind CSS

Файл конфігурації: `tailwind.config.ts`

### Налаштування TypeScript

Файл конфігурації: `tsconfig.json`

## 📁 Структура проекту

```
latest/
├── app/
│   ├── game.tsx              # Основний компонент гри
│   ├── page.tsx              # Головна сторінка
│   ├── layout.tsx            # Глобальний layout
│   └── globals.css           # Глобальні стилі
├── components/
│   └── ui/
│       ├── button.tsx        # Button компонент
│       ├── card.tsx          # Card компонент
│       ├── badge.tsx         # Badge компонент
│       └── progress.tsx      # Progress компонент
├── lib/
│   └── utils.ts              # Утилітарні функції
├── public/
│   ├── logo/                 # Логотипи партій
│   ├── photo/                # Фото кандидатів
│   └── media_logos/          # Логотипи ЗМІ
├── components.json           # shadcn-ui конфіг
├── package.json              # Залежності
├── tsconfig.json             # TypeScript конфіг
├── tailwind.config.ts        # Tailwind конфіг
└── next.config.ts            # Next.js конфіг
```

## 🐛 Розв'язання проблем

### Помилка: "Port 3000 is already in use"
```bash
# Використайте інший порт
npm run dev -- -p 3001
```

### Помилка: "Module not found"
```bash
# Очистіть кеш і переустановіть залежності
rm -rf node_modules package-lock.json
npm install
```

### Помилка при завантаженні зображень
Переконайтесь, що папки `public/logo/`, `public/photo/` та `public/media_logos/` містять всі необхідні файли PNG.

## 📚 Документація

- [Квик старт](./GETTING_STARTED.md)
- [Правила гри](./README_GAME.md)
- [Next.js документація](https://nextjs.org/docs)
- [Tailwind CSS документація](https://tailwindcss.com)
- [shadcn/ui документація](https://ui.shadcn.com)

## ✅ Перевірка встановлення

Щоб переконатися, що все встановлено правильно:

```bash
# Перевірити версії
node --version    # v18+
npm --version     # v9+

# Переглянути встановлені пакети
npm list

# Запустити linter
npm run lint
```

## 🚀 Готово!

Ваша гра повинна тепер працювати! Якщо виникають проблеми, перевірте:
1. Всі файли на місці
2. Залежності встановлені (`npm install`)
3. Node.js версія 18+
4. Немає помилок у консолі браузера (F12)

Розважайтесь грою! 🎮






