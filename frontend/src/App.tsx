import React, { useEffect, useState } from "react";
import {
  getChats,
  createChat,
  updateChat,
  deleteChat,
  Chat,
} from "./services/api";

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setChats(await getChats());
    } catch (error) {
      console.error("Error loading chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChat = async () => {
    try {
      const newChat = await createChat();
      setChats([newChat, ...chats]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const handleSaveTitle = async (id: number) => {
    if (!editTitle.trim()) return;
    try {
      const updated = await updateChat(id, editTitle);
      setChats(chats.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
    } catch (error) {
      console.error("Error updating chat:", error);
    }
  };

  const handleDeleteChat = async (id: number) => {
    try {
      await deleteChat(id);
      setChats(chats.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-bg text-text overflow-hidden">
      {/* Левая колонка: Меню (20%) */}
      <aside className="w-full md:w-[20%] bg-white border-r border-gray-200 p-4 flex flex-col">
        <h2 className="text-xl font-bold text-primary mb-4">Меню</h2>

        <div className="flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">ЧАТИКИ</h3>
          <button
            onClick={handleCreateChat}
            className="w-full mb-2 p-2 bg-primary text-white rounded font-medium hover:bg-blue-700 transition-colors"
          >
            + Добавить чат
          </button>

          {loading ? (
            <p className="text-sm text-gray-500">Загрузка...</p>
          ) : chats.length === 0 ? (
            <p className="text-sm text-gray-500">Нет чатов</p>
          ) : (
            <div className="space-y-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="group flex items-center gap-1 p-2 rounded hover:bg-bg transition-colors"
                >
                  {editingId === chat.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => handleSaveTitle(chat.id)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSaveTitle(chat.id)
                      }
                      className="flex-1 p-1 border border-primary rounded text-sm focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span
                      onClick={() => {
                        setEditingId(chat.id);
                        setEditTitle(chat.title);
                      }}
                      className="flex-1 text-sm cursor-pointer truncate"
                      title="Кликни для редактирования"
                    >
                      {chat.title}
                    </span>
                  )}
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm px-1 transition-opacity"
                    title="Удалить"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="space-y-2 mt-4 border-t border-gray-200 pt-4">
          <button className="w-full text-left p-2 rounded hover:bg-bg text-text font-medium transition-colors">
            🛠️ Инструменты
          </button>
        </nav>
      </aside>

      {/* Центральная колонка: Чат с агентом (25%) */}
      <main className="w-full md:w-[25%] bg-bg border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 font-semibold text-text bg-white">
          Чат с агентом
        </div>
        <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-600 space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <p>Привет! Я готов помочь с задачами, календарем и документами.</p>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <input
            type="text"
            placeholder="Введите сообщение..."
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <button className="mt-2 w-full bg-accent text-white py-2 rounded font-medium hover:bg-orange-600 transition-colors">
            Отправить
          </button>
        </div>
      </main>

      {/* Правая колонка: Контент (55%) */}
      <section className="w-full md:w-[55%] bg-white p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Рабочая область
        </h1>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 bg-bg">
          <p className="text-lg font-medium mb-2">
            Здесь будет отображаться содержимое:
          </p>
          <p>Задачи, Календарь, Документы или Совещания</p>
        </div>
      </section>
    </div>
  );
}

export default App;
