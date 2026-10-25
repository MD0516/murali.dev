export interface Project {
    _id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    techStack: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    featured: boolean;
    order: number;
    isDeleted: Date | null;
    createdAt: string;
    updatedAt: string;
}


export interface Skill {
    _id: string;
    category: string;
    skills: string[];
    order: number;
    isDeleted: Date | null;
    createdAt: string;
    updatedAt: string;
}

export type TimelineType = "edu" | "work";

export type TimelineStatus = "completed" | "ongoing" | "current";

export interface Timeline {
    _id: string;
    title: string;
    institution: string;
    description?: string;
    type: TimelineType;
    status: TimelineStatus;
    startDate: Date;
    endDate?: Date;
    isDeleted: Date | null;
    createdAt: string;
    updatedAt: string;
}

export interface About {
    _id: string;
    role: string;
    location: string;
    bio: string;
    tagline: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    message: string;
    data: T;
}