import axios from "axios";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@/hooks/localStorage.ts";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getItem } = useLocalStorage();
const token = getItem(LOCAL_STORAGE_KEYS.JWT_TOKEN);

export const apiClient = axios.create({
    baseURL: "https://api.realworld.io/api",
    headers: {
        Authorization: token ? `Token ${token}` : "",
    },
});
