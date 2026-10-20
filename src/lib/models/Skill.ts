import { Skill as ISkill } from "@/types";
import mongoose from "mongoose"

const skillSchema = new mongoose.Schema<ISkill>(
    {
        category: { type: String, required: true },
        skills: [{ type: String, required: true }],
        order: { type: Number, default: 0 },
        isDeleted: { type: Date, default: null }
    },
    { timestamps: true }
)

const Skill = mongoose.models.Skill ||  mongoose.model('Skill', skillSchema);

export default Skill;