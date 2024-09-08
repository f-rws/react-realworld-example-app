import { useContext } from "react";
import { AuthContext } from "./index";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthはAuthProvider内で使用する必要があります。");
    }
    return { isLoggedIn: context.isLoggedIn, login: context.login, logout: context.logout };
};
