import { createContext, ReactNode, useState } from "react";
import { z } from "zod";
import { userSchema } from "@/models/user.ts";

const userSchemaWithoutToken = userSchema.omit({ token: true });
type UserSchemaWithoutToken = z.infer<typeof userSchemaWithoutToken>;

type UserContextType = {
    user: UserSchemaWithoutToken | undefined;
    setUser: (user: UserSchemaWithoutToken) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserSchemaWithoutToken | undefined>(undefined);
    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
