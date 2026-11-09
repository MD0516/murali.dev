
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

    await Admin.create({
        name: "Alex Morgan",
        email,
        password,
    });

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
        location: "Austin, USA",
        bio: "I'm a full-stack developer passionate about building scalable web applications and creating intuitive digital experiences. I enjoy solving complex problems, exploring new technologies, and turning ideas into reliable products.",
        tagline: "Turning ideas into meaningful digital experiences.",
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
        {
            category: "Languages",
            skills: ["JavaScript", "TypeScript", "Python", "PHP"],
            order: 1,
        },
        {
            category: "Frontend",
            skills: ["React", "Next.js", "Vue.js", "Tailwind CSS"],
            order: 2,
        },
        {
            category: "Backend",
            skills: ["Node.js", "Express", "Laravel", "FastAPI"],
            order: 3,
        },
        {
            category: "Databases",
            skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
            order: 4,
        },
        {
            category: "Cloud & DevOps",
            skills: ["AWS", "Docker", "Vercel", "GitHub Actions"],
            order: 5,
        },
        {
            category: "Tools",
            skills: ["Git", "GitHub", "Postman", "Figma"],
            order: 6,
        },
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
        {
            type: "edu",
            title: "Bachelor of Computer Science",
            institution: "Westlake University",
            startDate: "2019-08-15T00:00:00.000Z",
            endDate: "2022-05-20T00:00:00.000Z",
            status: "completed",
            description: "Graduated with a focus on software engineering and application development.",
        },
        {
            type: "work",
            title: "Junior Web Developer",
            institution: "PixelCraft Studio",
            startDate: "2022-07-01T00:00:00.000Z",
            endDate: "2023-12-31T00:00:00.000Z",
            status: "completed",
            description: "Developed responsive websites and interactive web applications.",
        },
        {
            type: "edu",
            title: "Master of Computer Applications",
            institution: "Northbridge Institute of Technology",
            startDate: "2023-08-01T00:00:00.000Z",
            endDate: "2025-06-15T00:00:00.000Z",
            status: "completed",
            description: "Advanced studies in software architecture, databases, and distributed systems.",
        },
        {
            type: "work",
            title: "Full-Stack Developer",
            institution: "Nexa Digital Labs",
            startDate: "2024-01-15T00:00:00.000Z",
            endDate: "2025-08-31T00:00:00.000Z",
            status: "completed",
            description: "Built full-stack applications, REST APIs, and integrated third-party services.",
        },
        {
            type: "work",
            title: "Software Engineer",
            institution: "Vertex Technologies",
            startDate: "2025-09-01T00:00:00.000Z",
            endDate: null,
            status: "current",
            description: "Building scalable applications and maintaining production systems.",
        },
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

    const projects = [
        {
            title: "Atlas Learning Hub",
            shortDescription:
                "A comprehensive learning management platform for managing courses, students, and online education.",
            fullDescription:
                "Atlas Learning Hub is a learning management platform designed to simplify digital education. It provides tools for managing courses, student enrollment, learning materials, and academic progress. The platform features role-based access, interactive dashboards, and streamlined course management workflows.",
            techStack: [
                "React",
                "Node.js",
                "Express",
                "MongoDB",
                "JWT",
                "Tailwind CSS",
            ],
            images: [
                {
                    src: "https://placehold.co/1200x800/1e293b/ffffff?text=Atlas+Dashboard",
                    alt: "Atlas Learning Hub dashboard",
                },
                {
                    src: "https://placehold.co/1200x800/334155/ffffff?text=Course+Management",
                    alt: "Course management interface",
                },
            ],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/example/atlas-learning-hub",
            featured: true,
            order: 1,
        },
        {
            title: "CommerceFlow",
            shortDescription:
                "An e-commerce platform featuring product management, shopping carts, and order tracking.",
            fullDescription:
                "CommerceFlow is a modern e-commerce application built to provide a seamless shopping experience. It includes product catalog management, shopping cart functionality, secure authentication, order processing, and an administrative dashboard for managing store operations.",
            techStack: [
                "Next.js",
                "TypeScript",
                "Prisma",
                "PostgreSQL",
                "Stripe",
                "Tailwind CSS",
            ],
            images: [
                {
                    src: "https://placehold.co/1200x800/312e81/ffffff?text=CommerceFlow+Store",
                    alt: "CommerceFlow storefront",
                },
                {
                    src: "https://placehold.co/1200x800/4338ca/ffffff?text=Admin+Dashboard",
                    alt: "CommerceFlow administration dashboard",
                },
            ],
            liveUrl: "https://example.com",
            githubUrl: "https://github.com/example/commerce-flow",
            featured: true,
            order: 2,
        },
        {
            title: "TaskPilot",
            shortDescription:
                "A collaborative project management application with task tracking and team workflows.",
            fullDescription:
                "TaskPilot helps teams organize projects, assign tasks, monitor progress, and collaborate efficiently. It includes workspace management, task prioritization, status tracking, and team activity updates through an intuitive interface.",
            techStack: [
                "React",
                "TypeScript",
                "Express",
                "MongoDB",
                "TanStack Query",
                "Socket.IO",
            ],
            images: [
                {
                    src: "https://placehold.co/1200x800/14532d/ffffff?text=TaskPilot+Workspace",
                    alt: "TaskPilot project workspace",
                },
                {
                    src: "https://placehold.co/1200x800/166534/ffffff?text=Task+Board",
                    alt: "TaskPilot task management board",
                },
            ],
            liveUrl: "",
            githubUrl: "https://github.com/example/task-pilot",
            featured: false,
            order: 3,
        },
    ];

    await Project.insertMany(projects);

    console.log(`Projects seeded (${projects.length} projects)`);
};

const run = async () => {
    try {
        await connectDB();

        await seedAdmin();
        await seedAbout();
        await seedSkills();
        await seedTimeline();
        await seedProjects();

        console.log("\nSeed complete");
        process.exit(0);
    } catch (error) {
        console.error("Seed failed:", error);
        process.exit(1);
    }
};

run();
