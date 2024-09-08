import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "@/contexts/auth";
import { UserProvider } from "@/contexts/user";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </AuthProvider>
    </React.StrictMode>,
);
