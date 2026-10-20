import { Timeline as ITimeline } from "@/types";
import mongoose from "mongoose"

const timelineSchema = new mongoose.Schema<ITimeline>(
    {
        title: { type: String, required: true },
        institution: { type: String, required: true },
        description: { type: String },
        type: { type: String, enum: ["edu", "work"], required: true },
        status: { type: String, enum: ["completed", "ongoing", "current"], required: true },
        startDate: { type: String, required: true },
        endDate: { type: String },
        isDeleted: { type: Date, default: null }
    },
    { timestamps: true }
)

const Timeline = mongoose.models.Timeline || mongoose.model('Timeline', timelineSchema);

export default Timeline;