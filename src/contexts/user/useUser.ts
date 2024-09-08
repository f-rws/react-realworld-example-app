import { useContext } from "react";
import { UserContext } from "./index";

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserはUserProvider内で使用する必要があります。");
    }
    return { user: context.user, setUser: context.setUser };
};
