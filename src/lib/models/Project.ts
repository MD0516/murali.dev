import { Project as IProject } from "@/types";
import mongoose from "mongoose"

const projectSchema = new mongoose.Schema<IProject>(
    {
        title: { type: String, required: true },
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
        techStack: [{ type: String }],
        imageUrl: { type: String, required: true },
        liveUrl: { type: String },
        githubUrl: { type: String },
        featured: { type: Boolean, default: false },
        order: { type: Number, required: true },
        isDeleted: { type: Date, default: null }
    },
    { timestamps: true }
)

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;