# Vue 3 + TypeScript

## Рекомендации по настройке IDE

[VSCode](https://code.visualstudio.com/) + расширение [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (бывший Volar). Если установлен Vetur — отключите его.

## TypeScript

- Исходники пишутся на TypeScript: `.ts`-файлы и компоненты с `<script setup lang="ts">`.
- Конфигурация разбита на несколько файлов:
  - `tsconfig.json` — корневой, только ссылается на остальные;
  - `tsconfig.app.json` — код приложения (`src/`);
  - `tsconfig.vitest.json` — тесты (`*.spec.ts`, `__tests__`);
  - `tsconfig.node.json` — конфиги, которые выполняются в Node (`vite.config.ts`).
- Общие типы сущностей лежат в `src/types`.
- Vite (`npm run dev`) типы **не проверяет**, а только вырезает их. Ошибки типов показывает IDE и команда `npm run type-check`.

## Установка зависимостей

```sh
npm ci
```

### Запуск проекта

```sh
npm run dev
```

### Проверка типов

```sh
npm run type-check
```

### Сборка проекта (с проверкой типов)

```sh
npm run build
```

### Запуск тестов с помощью [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Линт с помощью [ESLint](https://eslint.org/)

```sh
npm run lint
```
