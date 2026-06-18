import { useEffect, useState } from "react";
import { createEvent, deleteEvent, getEvents, updateEvent } from "./services/eventService";
import Search from "./Search.jsx";
import Count from "./Count";
import Ranking from "./Ranking.jsx";

const emptyForm = {
  userName: "",
  userWeight: "",
  userHeight: "",
  exerciseName: "",
  bodyPart: "",
  weight: "",
  sets: "",
  reps: "",
  trainingDate: "",
  isCompleted: false,
};


function App() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState({
    mode: "date",
    value: "",
  });
  const [editingId, setEditingId] = useState(null);

  async function loadEvents() {
    // TODO：設定 loading、清空錯誤、呼叫 getEvents、更新 events
    setLoading(true);
    setErrorMessage("");
    try {
      const eventsData = await getEvents();
      setEvents(eventsData || []);
    } catch (error) {
      setErrorMessage("載入活動資料失敗");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    // TODO：更新 formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // TODO：檢查必填欄位
    if (!formData.userName || !formData.exerciseName || !formData.bodyPart) {
      setErrorMessage("使用者名稱、運動名稱和部位為必填欄位");
      return;
    }

    try {
      if (editingId) {
        await updateEvent(editingId, formData);
        setEditingId(null);
      } else {
        await createEvent(formData);
      }

      setFormData(emptyForm);
      await loadEvents();
    } catch (error) {
      setErrorMessage("操作失敗");
    }
  }

  async function handleDelete(id) {
    // TODO：呼叫 deleteEvent 並重新載入資料
    try {
      await deleteEvent(id);
      await loadEvents();
    } catch (error) {
      setErrorMessage("刪除活動失敗");
    }
  }

  function handleSearch(nextQuery) {
    setSearchQuery(nextQuery);
  }

  function handleEdit(event) {
    setFormData({
      userName: event.userName || "",
      userWeight: event.userWeight || "",
      userHeight: event.userHeight || "",
      exerciseName: event.exerciseName,
      bodyPart: event.bodyPart,
      weight: event.weight || "",
      sets: event.sets || "",
      reps: event.reps || "",
      trainingDate: event.trainingDate
        ? event.trainingDate.slice(0, 10)
        : "",
      isCompleted: event.isCompleted,
    });

    setEditingId(event._id);
  }
  const filteredEvents = events.filter((event) => {
    if (!searchQuery.value) return true;

    const keyword = searchQuery.value.toLowerCase();

    if (searchQuery.mode === "date") {
      const eventDate = event.trainingDate
        ? new Date(event.trainingDate).toISOString().slice(0, 10)
        : "";
      return eventDate === searchQuery.value;
    }

    if (searchQuery.mode === "Name") {
      return event.userName?.toLowerCase().includes(keyword);
    }

    if (searchQuery.mode === "weight") {
      return String(event.userWeight) === searchQuery.value;
    }

    if (searchQuery.mode === "height") {
      return String(event.userHeight) === searchQuery.value;
    }

    if (searchQuery.mode === "item") {
      return event.exerciseName?.toLowerCase().includes(keyword);
    }

    if (searchQuery.mode === "bodyPart") {
      return event.bodyPart?.toLowerCase().includes(keyword);
    }

    if (searchQuery.mode === "isCompleted") {
      return String(event.isCompleted) === searchQuery.value;
    }

    return true;
  });
  const searchSummary = searchQuery.value
    ? searchQuery.mode === "date"
      ? `日期：${searchQuery.value}`
      : `項目：${searchQuery.value}`
    : "顯示全部資料";


  return (
    <main className="container">
      <div className="head">
        <h1>健身訓練紀錄系統</h1>
        <p>歡迎使用健身訓練紀錄系統。</p>
      </div>

      <div className="layout">

        <form className="card" onSubmit={handleSubmit}>

          <input
            type="text"
            name="userName"
            placeholder="使用者名稱"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="number"
            name="userWeight"
            placeholder="體重 (kg)"
            value={formData.userWeight}
            onChange={handleChange}
          />
          <input
            type="number"
            name="userHeight"
            placeholder="身高 (cm)"
            value={formData.userHeight}
            onChange={handleChange}
          />

          <select name="exerciseName" value={formData.exerciseName} onChange={handleChange}>
            <option value="">請選擇運動名稱</option>
            <option value="臥推">臥推</option>
            <option value="引體向上">引體向上</option>
            <option value="深蹲">深蹲</option>
            <option value="肩推">肩推</option>
          </select>
          <select name="bodyPart" value={formData.bodyPart} onChange={handleChange}>
            <option value="">請選擇部位</option>
            <option value="胸">胸</option>
            <option value="背">背</option>
            <option value="腿">腿</option>
            <option value="肩">肩</option>
            <option value="手臂">手臂</option>
            <option value="核心">核心</option>
          </select>
          <select name="weight" value={formData.weight} onChange={handleChange}>
            <option value="">請選擇重量</option>
            <option value="5">5 kg</option>
            <option value="10">10 kg</option>
            <option value="15">15 kg</option>
            <option value="20">20 kg</option>
          </select>
          <select name="sets" value={formData.sets} onChange={handleChange}>
            <option value="">請選擇組數</option>
            <option value="1">1 組</option>
            <option value="2">2 組</option>
            <option value="3">3 組</option>
          </select>
          <select name="reps" value={formData.reps} onChange={handleChange}>
            <option value="">請選擇次數</option>
            <option value="5">5 次</option>
            <option value="10">10 次</option>
            <option value="15">15 次</option>
          </select>
          <input
            type="date"
            name="trainingDate"
            value={formData.trainingDate}
            onChange={handleChange}
          />
          <select name="isCompleted" value={formData.isCompleted}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isCompleted: e.target.value === "true",
              }))
            }
          >
            <option value="false">未完成</option>
            <option value="true">已完成</option>
          </select>

          <button type="submit" className="add">新增運動紀錄</button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData(emptyForm);
              }}
            >
              取消編輯
            </button>
          )}
        </form>

        <Search onSearch={handleSearch} />
        {/* <Count events={events} /> */}

      </div>



      {loading && <p>載入中...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <section className="card">
        <h2>搜尋結果</h2>
        <p>搜尋條件：{searchSummary}</p>
        <p>符合筆數：{filteredEvents.length} 筆</p>
      </section>

      {!loading && filteredEvents.length === 0 && <p>目前沒有符合條件的運動記錄。</p>}

      <section>
        {filteredEvents.map((event) => (
          <article className="card artcard" key={event._id}>
            <h2>{event.userName}</h2>
            <p>體重：{event.userWeight || "未設定"} kg</p>
            <p>身高：{event.userHeight || "未設定"} cm</p>
            <p>
              BMI：
              {event.userWeight && event.userHeight
                ? (
                  event.userWeight /
                  Math.pow(event.userHeight / 100, 2)
                ).toFixed(1)
                : "未設定"}
            </p>
            <h2>{event.exerciseName}</h2>
            <p>部位：{event.bodyPart}</p>
            <p>重量：{event.weight || "未設定"}</p>
            <p>組數：{event.sets || "未設定"}</p>
            <p>次數：{event.reps || "未設定"}</p>
            <p>訓練日期：{event.trainingDate ? new Date(event.trainingDate).toLocaleDateString() : "未設定"}</p>
            <p>狀態：{event.isCompleted ? "已完成" : "未完成"}</p>
            <button onClick={() => handleDelete(event._id)} className="delete">
              刪除
            </button>
            <button onClick={() => handleEdit(event)}>
              編輯
            </button>
          </article>
        ))}
      </section>

      <Count events={events} />
      <Ranking events={events} />

    </main>
  );
}

export default App;
