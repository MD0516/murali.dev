import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: "/api",
    withCredentials: true
});

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data?.message === "string") {
            return data.message;
        }

        if (typeof data?.error === "string") {
            return data.error;
        }

        if (typeof error.message === "string") {
            return error.message;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong";
};

api.interceptors.response.use(
    (response) => response,

    (error: AxiosError) => {
        return Promise.reject(
            new Error(getErrorMessage(error))
        );
    }
);