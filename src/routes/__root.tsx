import { useEffect } from "react";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { apiClientUser } from "@/api/user";
import { useAuthedUser } from "@/contexts/authed-user/useAuthedUser.ts";
import { Header } from "@/components/layout/Header.tsx";
import { LOCAL_STORAGE_KEYS, useLocalStorage } from "@/hooks/localStorage.ts";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const navigate = useNavigate();
    const { getItem } = useLocalStorage();
    const { authedUser, setAuthedUser } = useAuthedUser();

    useEffect(() => {
        if (!getItem(LOCAL_STORAGE_KEYS.JWT_TOKEN)) {
            navigate({ to: "/login" });
            return;
        }
        if (authedUser) return;

        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const { data } = await apiClientUser.get();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { token, ...rest } = data.user;
            setAuthedUser(rest);
        } catch (e) {
            // TODO: error処理を追加
        }
    };
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}
