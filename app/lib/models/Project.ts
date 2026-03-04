import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
