const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"}/events`;

export async function getEvents() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("取得活動資料失敗");
  }

  return response.json();
}

export async function createEvent(eventData) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error("新增活動失敗");
  }

  return response.json();
}

export async function deleteEvent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("刪除活動失敗");
  }

  return response.json();
}

export async function updateEvent(id, eventData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Error("更新活動失敗");
  }

  return response.json();
}
