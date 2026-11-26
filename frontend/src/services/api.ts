const API_BASE = "http://localhost:8000";

export interface Chat {
  id: number;
  title: string;
  created_at: string;
}

export async function getChats(): Promise<Chat[]> {
  const response = await fetch(`${API_BASE}/api/chats/`);
  if (!response.ok) throw new Error("Failed to fetch chats");
  return response.json();
}

export async function createChat(title: string = "Новый чат"): Promise<Chat> {
  const response = await fetch(`${API_BASE}/api/chats/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to create chat");
  return response.json();
}

export async function updateChat(id: number, title: string): Promise<Chat> {
  const response = await fetch(`${API_BASE}/api/chats/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to update chat");
  return response.json();
}

export async function deleteChat(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/api/chats/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete chat");
}
