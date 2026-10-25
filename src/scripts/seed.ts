import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import connectDB from "../lib/db";
import Admin from "../lib/models/AdminUser";
import About from "../lib/models/About";
import Project from "../lib/models/Project";
import Skill from "../lib/models/Skill";
import Timeline from "../lib/models/Timeline";

const seedAdmin = async () => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in your env before seeding");
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
        console.log(`Admin already exists (${email}), skipping`);
        return;
    }
    await Admin.create({ name: "Murali Dharan", email, password });

    console.log(`Admin created (${email})`);
};

const seedAbout = async () => {
    const existing = await About.findOne();
    if (existing) {
        console.log("About already seeded, skipping");
        return;
    }

    await About.create({
        role: "Full-Stack Developer",
        location: "Chennai, India",
        bio: "Chennai-based full-stack developer...", // replace with real content
        tagline: "Building web applications with modern technologies",
    });

    console.log("About seeded");
};

const seedSkills = async () => {
    const existing = await Skill.countDocuments();
    if (existing > 0) {
        console.log("Skills already seeded, skipping");
        return;
    }

    const categories = [
        { category: "Languages", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"], order: 1 },
        { category: "Frontend", skills: ["React", "Bootstrap", "Tailwind CSS", "Next.js"], order: 2 },
        { category: "Backend", skills: ["Node.js", "Express", "Nest.js", "Laravel"], order: 3 },
        { category: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB"], order: 4 },
        { category: "Cloud/DevOps", skills: ["Google Cloud Run"], order: 5 },
        { category: "Tools", skills: ["Git", "GitHub"], order: 6 },
    ];

    await Skill.insertMany(categories);
    console.log(`Skills seeded (${categories.length} categories)`);
};

const seedTimeline = async () => {
    const existing = await Timeline.countDocuments();
    if (existing > 0) {
        console.log("Timeline already seeded, skipping");
        return;
    }

    const entries = [
        { type: "edu", title: "B.Com", institution: "Hindustan College of Arts & Science", startDate: "2022", endDate: "2025", status: "completed" },
        { type: "edu", title: "Full-Stack Training", institution: "FITA Academy", startDate: "Jan 2025", endDate: "May 2025", status: "completed" },
        { type: "work", title: "Intern — LMS Development", institution: "ARKFA", startDate: "Apr 2025", endDate: "Aug 2026", status: "completed", description: "Built the ARKFA LMS (MERN + JWT + GCR)." },
        { type: "edu", title: "MCA (Correspondence)", institution: "University of Madras", startDate: "2025", endDate: "Expected 2028", status: "ongoing" },
        { type: "work", title: "Software Engineer", institution: "Vruksha International School of Montessori", startDate: "Sep 2026", endDate: null, status: "current" },
    ];

    await Timeline.insertMany(entries);
    console.log(`Timeline seeded (${entries.length} entries)`);
};

const seedProjects = async () => {
    const existing = await Project.countDocuments();
    if (existing > 0) {
        console.log("Projects already seeded, skipping");
        return;
    }

    await Project.create({
        title: "ARKFA LMS",
        shortDescription: "A learning management system built for a client during internship.",
        fullDescription: "A learning management system built for a client during internship.",
        techStack: ["MongoDB", "Express", "React", "Node.js", "JWT", "Google Cloud Run"],
        featured: true,
        order: 1,
        imageUrl: "https://drive.google.com/file/d/1YjIkzjpG7uyh3MoRhvfNvgsIL5sRXz4M/preview",
    });

    console.log("Projects seeded");
};

export const run = async () => {
    await connectDB();

    await seedAdmin();
    await seedAbout();
    await seedSkills();
    await seedTimeline();
    await seedProjects();

    console.log("\nSeed complete");
    process.exit(0);
};

run().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});