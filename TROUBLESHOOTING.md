# 🔧 Решение проблем

## Проблема: Сервер не загружается

### Решение 1: Очистить кеш и перезапустить

```bash
# Остановить все процессы Node.js
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Удалить папку .next
rm -r .next -Force

# Переустановить зависимости
rm node_modules -r -Force
rm package-lock.json
npm install

# Перезапустить dev сервер
npm run dev
```

### Решение 2: Используйте другой порт

```bash
npm run dev -- -p 3001
```

## Проблема: Port 3000 is already in use

### Решение:

```bash
# В PowerShell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Или использовать другой порт
npm run dev -- -p 3001
```

## Проблема: Страница загружается пусто (blank page)

### Проверьте:
1. Откройте консоль браузера (F12)
2. Проверьте вкладку Console на ошибки
3. Проверьте вкладку Network на 404 ошибки для изображений

### Частые причины:
- ❌ Изображения не скопированы в `public/` папку
- ❌ Ошибки в компонентах React
- ❌ Проблемы с импортами

### Решение:

```bash
# Убедитесь, что изображения на месте
ls public/logo/
ls public/photo/
ls public/media_logos/

# Если нет, скопируйте их
cd ..
Copy-Item -Path "logo" -Destination "latest\public\logo" -Recurse -Force
Copy-Item -Path "photo" -Destination "latest\public\photo" -Recurse -Force
Copy-Item -Path "media_logos" -Destination "latest\public\media_logos" -Recurse -Force
```

## Проблема: Компоненты не отображаются

### Проверьте:
1. Все компоненты в `components/ui/` созданы
2. Файл `lib/utils.ts` существует
3. Нет синтаксических ошибок

### Решение:

```bash
# Проверить наличие файлов
ls components/ui/
ls lib/

# Перезагрузить страницу в браузере (Ctrl+Shift+R для полной очистки кеша)
```

## Проблема: Ошибки типизации TypeScript

### Решение:

```bash
# Перестроить TypeScript
npx tsc --noEmit

# Если все еще ошибки, удалить .next и пересобрать
rm -r .next -Force
npm run build
```

## Проблема: Изображения не загружаются

### Проверьте пути:
- Логотипы: `/logo/Grosu.png` ✓
- Фото: `/photo/Grosu-photo.png` ✓
- ЗМІ: `/media_logos/Europa-Libera.png` ✓

### Решение:

```bash
# Убедитесь, что файлы PNG, а не другого формата
ls public/logo/

# Все пути должны быть относительно public/
# Например: /logo/Grosu.png = public/logo/Grosu.png
```

## Проблема: Медленная загрузка

### Оптимизация:

```bash
# Используйте production build для тестирования производительности
npm run build
npm start

# Или используйте другой порт если 3000 занят
npm run dev -- -p 3001
```

## Проблема: ESLint ошибки

### Решение:

```bash
# Запустить linter
npm run lint

# Исправить проблемы автоматически
npx eslint --fix app/ components/ lib/
```

## Полезные команды

```bash
# Проверить версии
node --version    # Должен быть v18+
npm --version     # Должен быть v9+

# Очистить npm кеш
npm cache clean --force

# Проверить установленные пакеты
npm list

# Переустановить все
npm ci  # или npm install

# Запустить с дебаг информацией
DEBUG=* npm run dev
```

## Контакт и поддержка

Если проблема не решена:
1. Проверьте консоль браузера (F12)
2. Посмотрите вывод в терминале
3. Убедитесь, что все файлы на месте
4. Попробуйте очистить весь кеш и переустановить

---

**Гра должна загрузиться на http://localhost:3000** 🎮






