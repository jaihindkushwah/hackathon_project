import mongoose, { Schema } from "mongoose";

interface IHackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  participants?: string[];
  tags?: string[];
}
const hackathonSchema = new Schema<IHackathon>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: { type: [String] },
    tags: { type: [String] },
  },
  { timestamps: true }
);
export const HackathonModel =
  mongoose.models.Hackathon ||
  mongoose.model<IHackathon>("Hackathon", hackathonSchema);
