from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.database import engine
from app.models.chat import Base
from app.api import chats


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Создаем таблицы в БД при старте приложения (для учебного проекта это ок)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title="AI Assistant Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chats.router)


@app.get("/health")
async def health_check():
    return {"status": "ok", "db": "connected"}
