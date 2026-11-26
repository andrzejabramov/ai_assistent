from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from pydantic import BaseModel
from app.core.database import get_db
from app.models.chat import Chat

router = APIRouter(prefix="/api/chats", tags=["chats"])


class ChatCreate(BaseModel):
    title: str = "Новый чат"


class ChatUpdate(BaseModel):
    title: str


@router.get("/")
async def get_chats(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Chat).order_by(Chat.created_at.desc()))
    return [
        {"id": c.id, "title": c.title, "created_at": c.created_at.isoformat()}
        for c in result.scalars().all()
    ]


@router.post("/")
async def create_chat(chat: ChatCreate, db: AsyncSession = Depends(get_db)):
    new_chat = Chat(title=chat.title)
    db.add(new_chat)
    await db.commit()
    await db.refresh(new_chat)
    return {
        "id": new_chat.id,
        "title": new_chat.title,
        "created_at": new_chat.created_at.isoformat(),
    }


@router.patch("/{chat_id}")
async def update_chat(
    chat_id: int, chat: ChatUpdate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Chat).where(Chat.id == chat_id))
    db_chat = result.scalar_one_or_none()
    if not db_chat:
        raise HTTPException(status_code=404, detail="Chat not found")
    db_chat.title = chat.title
    await db.commit()
    await db.refresh(db_chat)
    return {
        "id": db_chat.id,
        "title": db_chat.title,
        "created_at": db_chat.created_at.isoformat(),
    }


@router.delete("/{chat_id}")
async def delete_chat(chat_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(delete(Chat).where(Chat.id == chat_id))
    await db.commit()
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Chat not found")
    return {"status": "deleted"}
