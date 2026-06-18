import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/web_management_campus_events";
app.use(cors());
app.use(express.json());

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URI || LOCAL_MONGODB_URI);
  console.log("MongoDB connected.");
}

app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "取得活動資料失敗", error: error.message });
  }
});

app.get("/api/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "找不到資料"
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "取得資料失敗",
      error: error.message
    });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const { userName, userWeight, userHeight, exerciseName, bodyPart, weight, sets, reps, trainingDate, isCompleted } = req.body;
    if (!userName || !exerciseName || !bodyPart) {
      return res.status(400).json({ message: "使用者名稱、運動名稱與部位為必填欄位" });
    }

    const newEvent = await Event.create({ userName, userWeight, userHeight, exerciseName, bodyPart, weight, sets, reps, trainingDate, isCompleted });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "新增活動失敗", error: error.message });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "找不到要刪除的活動" });
    res.json({ message: "刪除成功", deletedId: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "刪除活動失敗", error: error.message });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "找不到資料" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "更新失敗", error: error.message });
  }
});

connectDB().then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)));
