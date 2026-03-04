import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "high" | "medium" | "low";

export interface ITask extends Document {
  title: string;
  status: TaskStatus;
  projectId: Types.ObjectId;
  assignee?: string;
  dueDate?: Date;
  priority?: TaskPriority;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    assignee: { type: String, trim: true },
    dueDate: { type: Date },
    priority: { type: String, enum: ["high", "medium", "low"] },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const Task: Model<ITask> =
  mongoose.models.Task ?? mongoose.model<ITask>("Task", TaskSchema);

export default Task;
