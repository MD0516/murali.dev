import { Project as IProject } from "@/types";
import { requireAdmin } from "../auth";
import connectDB, { UPDATE_OPTIONS } from "../db";
import { NotFoundError } from "../errors";
import Project from "../models/Project";
import { ReorderPayload } from "../validators/common";
import {
    CreateProjectPayload,
    UpdateProjectPayload,
} from "../validators/project";

export const getProjects = async (): Promise<IProject[]> => {
    await connectDB();

    const projects = await Project.find({ isDeleted: null });

    return projects;
};

export const createProject = async (
    data: CreateProjectPayload
): Promise<IProject> => {
    await connectDB();
    await requireAdmin();

    const project = await Project.create(data);

    return project;
};

export const updateProject = async (
    id: string,
    data: UpdateProjectPayload
): Promise<IProject> => {
    await connectDB();
    await requireAdmin();

    const project = await Project.findOneAndUpdate(
        { _id: id, isDeleted: null },
        data,
        UPDATE_OPTIONS
    );

    if (!project) {
        throw new NotFoundError("Project not found");
    }

    return project;
};

export const deleteProject = async (id: string): Promise<boolean> => {
    await connectDB();
    await requireAdmin();

    const project = await Project.findOneAndUpdate(
        { _id: id, isDeleted: null },
        {
            isDeleted: new Date(),
        },
        UPDATE_OPTIONS
    );

    if (!project) {
        throw new NotFoundError("Project not found");
    }

    return true;
};

export const reorderProjects = async (
    data: ReorderPayload
): Promise<boolean> => {
    await connectDB();
    await requireAdmin();

    await Project.bulkWrite(
        data.order.map(({ id, order: newOrder }) => ({
            updateOne: {
                filter: { _id: id, isDeleted: null },
                update: { order: newOrder },
            },
        }))
    );

    return true;
};