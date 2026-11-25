# AI Assistant - Учебный проект

Бизнес-ассистент с AI-агентом для управления задачами, документами и совещаниями.

## Структура проекта

- `backend/` - FastAPI + SQLite + AI агенты
- `frontend/` - React + TypeScript + Tailwind CSS
- `dsh/` - DeepSeek Harness (изолированный AI-кодер)

## Быстрый старт

docker compose up --build

## Безопасность

- Секреты в `.env` (не коммитится)
- DeepSeek Harness изолирован в Docker и не видит секреты
- Backend получает секреты через environment из docker-compose
