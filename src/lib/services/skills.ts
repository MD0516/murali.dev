import { Skill as ISkill } from "@/types";
import Skill from "../models/Skill";
import { requireAdmin } from "../auth";
import {
    CreateSkillPayload,
    UpdateSkillPayload,
} from "../validators/skill";
import { NotFoundError } from "../errors";
import { ReorderPayload } from "../validators/common";
import connectDB, { UPDATE_OPTIONS } from "../db";

export const getSkills = async (): Promise<ISkill[]> => {
    await connectDB();

    const skills = await Skill.find({ isDeleted: null });

    return skills;
};

export const createSkill = async (
    data: CreateSkillPayload
): Promise<ISkill> => {
    await connectDB();
    await requireAdmin();

    const skill = await Skill.create(data);

    return skill;
};

export const updateSkill = async (
    id: string,
    data: UpdateSkillPayload
): Promise<ISkill> => {
    await connectDB();
    await requireAdmin();

    const skill = await Skill.findOneAndUpdate(
        { _id: id, isDeleted: null },
        data,
        UPDATE_OPTIONS
    );

    if (!skill) {
        throw new NotFoundError("Skill not found");
    }

    return skill;
};

export const deleteSkill = async (id: string): Promise<boolean> => {
    await connectDB();
    await requireAdmin();

    const skill = await Skill.findOneAndUpdate(
        { _id: id, isDeleted: null },
        {
            isDeleted: new Date(),
        },
        UPDATE_OPTIONS
    );

    if (!skill) {
        throw new NotFoundError("Skill not found");
    }

    return true;
};

export const reorderSkills = async (
    data: ReorderPayload
): Promise<boolean> => {
    await connectDB();
    await requireAdmin();

    await Skill.bulkWrite(
        data.order.map(({ id, order: newOrder }) => ({
            updateOne: {
                filter: { _id: id, isDeleted: null },
                update: { order: newOrder },
            },
        }))
    );

    return true;
};