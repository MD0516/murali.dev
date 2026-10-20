import { About, AdminUser, Project, Skill, Timeline } from "@/types";
import { ApiResponse } from "@/types";

import { LoginPayload } from "@/lib/validators/login";
import { CreateProjectPayload, UpdateProjectPayload } from "@/lib/validators/project";
import { CreateSkillPayload, UpdateSkillPayload } from "@/lib/validators/skill";
import { UpdateAboutPayload } from "@/lib/validators/about";
import {
    CreateTimelinePayload,
    UpdateTimelinePayload,
} from "@/lib/validators/timeline";
import { ReorderPayload } from "@/lib/validators/common";
import { ContactPayload } from "@/lib/validators/contact";

import { api } from "./client";


export const auth = {
    login: async (
        data: LoginPayload
    ): Promise<{ message: string }> =>
        await api.post("/auth/login", data).then(res => res.data),

    getAdmin: async (): Promise<ApiResponse<AdminUser>> =>
        await api.get("/auth/session").then(res => res.data),

    logout: async (): Promise<{ message: string }> =>
        await api.post("/auth/logout").then(res => res.data),
};


export const project = {
    getAll: async (): Promise<ApiResponse<Project[]>> =>
        await api.get("/projects").then(res => res.data),

    create: async (
        data: CreateProjectPayload
    ): Promise<ApiResponse<Project>> =>
        await api.post("/projects", data).then(res => res.data),

    update: async (
        id: string,
        data: UpdateProjectPayload
    ): Promise<ApiResponse<Project>> =>
        await api.patch(`/projects/${id}`, data).then(res => res.data),

    delete: async (
        id: string
    ): Promise<{ message: string }> =>
        await api.delete(`/projects/${id}`).then(res => res.data),

    reorder: async (
        data: ReorderPayload
    ): Promise<{ message: string }> =>
        await api.patch("/projects/reorder", data).then(res => res.data),
};


export const skill = {
    getAll: async (): Promise<ApiResponse<Skill[]>> =>
        await api.get("/skills").then(res => res.data),

    create: async (
        data: CreateSkillPayload
    ): Promise<ApiResponse<Skill>> =>
        await api.post("/skills", data).then(res => res.data),

    update: async (
        id: string,
        data: UpdateSkillPayload
    ): Promise<ApiResponse<Skill>> =>
        await api.patch(`/skills/${id}`, data).then(res => res.data),

    delete: async (
        id: string
    ): Promise<{ message: string }> =>
        await api.delete(`/skills/${id}`).then(res => res.data),

    reorder: async (
        data: ReorderPayload
    ): Promise<{ message: string }> =>
        await api.patch("/skills/reorder", data).then(res => res.data),
};


export const about = {
    get: async (): Promise<ApiResponse<About>> =>
        await api.get("/about").then(res => res.data),

    update: async (
        data: UpdateAboutPayload
    ): Promise<ApiResponse<About>> =>
        await api.patch("/about", data).then(res => res.data),
};


export const timeline = {
    getAll: async (): Promise<ApiResponse<Timeline[]>> =>
        await api.get("/timeline").then(res => res.data),

    create: async (
        data: CreateTimelinePayload
    ): Promise<ApiResponse<Timeline>> =>
        await api.post("/timeline", data).then(res => res.data),

    update: async (
        id: string,
        data: UpdateTimelinePayload
    ): Promise<ApiResponse<Timeline>> =>
        await api.patch(`/timeline/${id}`, data).then(res => res.data),

    delete: async (
        id: string
    ): Promise<{ message: string }> =>
        await api.delete(`/timeline/${id}`).then(res => res.data),

    reorder: async (
        data: ReorderPayload
    ): Promise<{ message: string }> =>
        await api.patch("/timeline/reorder", data).then(res => res.data),
};


export const upload = {
    image: async (
        file: File
    ): Promise<ApiResponse<string>> => {
        const formData = new FormData();

        formData.append("file", file);

        return await api
            .post("/upload", formData)
            .then(res => res.data);
    },
};


export const contact = {
    send: async (
        data: ContactPayload
    ): Promise<{ message: string; success: boolean }> =>
        await api.post("/contact", data).then(res => res.data),
};