# Базовый образ для DeepSeek Harness (замените на актуальный)
FROM python:3.12-slim

WORKDIR /app

# Установка базовых инструментов для агента-разработчика
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Копирование конфигурации (секретов здесь нет)
COPY config/ ./config/
COPY plugins/ ./plugins/

VOLUME ["/workspace/backend", "/workspace/frontend", "/app/logs"]

CMD ["sleep", "infinity"]