import { Timeline as ITimeline } from "@/types";
import { requireAdmin } from "../auth";
import { NotFoundError } from "../errors";
import Timeline from "../models/Timeline";
import {
    CreateTimelinePayload,
    UpdateTimelinePayload,
} from "../validators/timeline";
import { ReorderPayload } from "../validators/common";
import connectDB, { UPDATE_OPTIONS } from "../db";

export const getTimelines = async (): Promise<ITimeline[]> => {
    await connectDB();

    const timelineEntries = await Timeline.find({
        isDeleted: null,
    });

    return timelineEntries;
};

export const createTimeLine = async (
    data: CreateTimelinePayload
): Promise<ITimeline> => {
    await connectDB();
    await requireAdmin();

    const timeline = await Timeline.create(data);

    return timeline;
};

export const updateTimeLine = async (
    id: string,
    data: UpdateTimelinePayload
): Promise<ITimeline> => {
    await connectDB();
    await requireAdmin();

    const timeline = await Timeline.findOneAndUpdate(
        { _id: id, isDeleted: null },
        data,
        UPDATE_OPTIONS
    );

    if (!timeline) {
        throw new NotFoundError("Timeline not found");
    }

    return timeline;
};

export const deleteTimeLine = async (id: string): Promise<boolean> => {
    await connectDB();
    await requireAdmin();

    const timeline = await Timeline.findOneAndUpdate(
        { _id: id, isDeleted: null },
        {
            isDeleted: new Date(),
        },
        UPDATE_OPTIONS
    );

    if (!timeline) {
        throw new NotFoundError("Timeline not found");
    }

    return true;
};

export const reorderTimelines = async (
    data: ReorderPayload
): Promise<boolean> => {
    await connectDB();
    await requireAdmin();

    await Timeline.bulkWrite(
        data.order.map(({ _id, order: newOrder }) => ({
            updateOne: {
                filter: { _id, isDeleted: null },
                update: { order: newOrder },
            },
        }))
    );

    return true;
};