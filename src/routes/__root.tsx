import { createRootRoute } from "@tanstack/react-router";
import { Header } from "../components/layout/Header.tsx";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Header />
            app
        </>
    );
}
