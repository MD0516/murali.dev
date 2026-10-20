import { handleApiError } from "./errors";

type RouteHandler<Args extends unknown[]> = (...args: Args) => Promise<Response>;

export const withErrorHandler = <Args extends unknown[]>(
    handler: RouteHandler<Args>
): RouteHandler<Args> => {
    return async (...args: Args) => {
        try {
            return await handler(...args);
        } catch (error) {
            return handleApiError(error) as Response;
        }
    };
};