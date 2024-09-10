import { apiClient } from "@/api";
import { GetResponse } from "./types.ts";

const API_PATH = "/user";

const get = () => {
    return apiClient.get<GetResponse>(`${API_PATH}`);
};

export const apiClientUser = {
    get,
};
