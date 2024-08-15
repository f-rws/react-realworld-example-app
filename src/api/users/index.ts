import { apiClient } from "../index.ts";
import { PostLoginRequest, PostLoginResponse } from "./types.ts";

const API_PATH = "/users";

const postLogin = (data: PostLoginRequest) => {
    return apiClient.post<PostLoginResponse>(`${API_PATH}/login`, data);
};

export const apiClientUsers = {
    postLogin,
};
