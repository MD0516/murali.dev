import mongoose from "mongoose"

const aboutSchema = new mongoose.Schema(
    {
        role: { type: String, required: true },
        location: { type: String, required: true },
        bio: { type: String, required: true },
        tagline: { type: String, required: true },
        resume: { type: String, required: false },
    },
    { timestamps: true }
)

const About = mongoose.models.About || mongoose.model('About', aboutSchema);

export default About;