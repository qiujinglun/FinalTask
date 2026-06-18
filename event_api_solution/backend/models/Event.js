import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    userWeight: { type: Number },
    userHeight: { type: Number },
    exerciseName: { type: String, required: true, trim: true },
    bodyPart: { type: String, required: true, trim: true },
    weight: { type: Number },
    sets: { type: Number },
    reps: { type: Number },
    trainingDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;


// userName
// userWeight
// userHeight
// exerciseName
// bodyPart
// weight
// sets
// reps
// trainingDate
// isCompleted