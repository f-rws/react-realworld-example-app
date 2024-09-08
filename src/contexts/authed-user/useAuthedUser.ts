import { useContext } from "react";
import { AuthedUserContext } from "./index";

export const useAuthedUser = () => {
    const context = useContext(AuthedUserContext);
    if (!context) {
        throw new Error("useUserはUserProvider内で使用する必要があります。");
    }
    return { authedUser: context.authedUser, setAuthedUser: context.setAuthedUser };
};
