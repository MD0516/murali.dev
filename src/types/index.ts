export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    techStack: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
    order: number;
}


type TimelineType = "edu" | "work";
type TimelineStatus = "completed" | "ongoing" | "current";

export interface TimelineEntry {
    id: string;
    title: string;
    institution: string;
    description?: string;
    type: TimelineType;
    status: TimelineStatus;
    startDate: string;
    endDate?: string;
}