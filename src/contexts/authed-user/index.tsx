import { createContext, ReactNode, useState } from "react";
import { z } from "zod";
import { authedUserSchema } from "@/models/user.ts";

type AuthedUser = z.infer<typeof authedUserSchema>;

type AuthedUserContextType = {
    authedUser: AuthedUser | undefined;
    setAuthedUser: (user: AuthedUser) => void;
};

export const AuthedUserContext = createContext<AuthedUserContextType | undefined>(undefined);

export const AuthedUserProvider = ({ children }: { children: ReactNode }) => {
    const [authedUser, setAuthedUser] = useState<AuthedUser | undefined>(undefined);
    return <AuthedUserContext.Provider value={{ authedUser, setAuthedUser }}>{children}</AuthedUserContext.Provider>;
};
