import { apiClient } from "@/api";
import { PostLoginRequest, PostLoginResponse, PostRequest, PostResponse } from "./types.ts";

const API_PATH = "/users";

const post = (data: PostRequest) => {
    return apiClient.post<PostResponse>(`${API_PATH}`, data);
};

const postLogin = (data: PostLoginRequest) => {
    return apiClient.post<PostLoginResponse>(`${API_PATH}/login`, data);
};

export const apiClientUsers = {
    post,
    postLogin,
};
