import { createContext, ReactNode, useState } from "react";
import { z } from "zod";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@/hooks/localStorage.ts";
import { userSchema } from "@/models/user.ts";

type User = z.infer<typeof userSchema>;

type AuthContextType = {
    isLoggedIn: boolean;
    login: (token: User["token"]) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { setItem, getItem } = useLocalStorage();
    const [isLoggedIn, setIsLoggedIn] = useState<AuthContextType["isLoggedIn"]>(
        !!getItem(LOCAL_STORAGE_KEYS.JWT_TOKEN),
    );

    const login: AuthContextType["login"] = (token) => {
        setIsLoggedIn(true);
        setItem(LOCAL_STORAGE_KEYS.JWT_TOKEN, token);
    };
    const logout = () => {
        setIsLoggedIn(false);
        // TODO: localStorageからtoken情報を削除する
    };

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};
