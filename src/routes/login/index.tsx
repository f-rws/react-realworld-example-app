import { useState } from "react";
import { isAxiosError } from "axios";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { apiClientUsers } from "@/api/users";
import { useAuth } from "@/contexts/auth/useAuth.ts";
import { useAuthedUser } from "@/contexts/authed-user/useAuthedUser.ts";
import { userAuthSchema } from "@/models/user.ts";
import { LoginForm } from "./-components/LoginForm";

export const Route = createFileRoute("/login/")({
    component: Login,
});

const formDataSchema = userAuthSchema.omit({ username: true });
type FormData = z.infer<typeof formDataSchema>;

function Login() {
    const { login } = useAuth();
    const { setAuthedUser } = useAuthedUser();

    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const onSubmit = async (requestData: FormData) => {
        setErrorMessages([]);

        try {
            const { data } = await apiClientUsers.postLogin({ user: requestData });
            const { token, ...rest } = data.user;
            login(token);
            setAuthedUser(rest);
        } catch (err) {
            if (isAxiosError(err)) {
                const errorMessagesMap = new Map<string, string[]>(Object.entries(err.response?.data.errors));
                errorMessagesMap.forEach((messages, key) => {
                    const errorMessagesByKey = messages.map((message) => `${key}: ${message}`);
                    setErrorMessages((prevState) => [...prevState, ...errorMessagesByKey]);
                });
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link to={"/register"}>Need an account?</Link>
                        </p>

                        {errorMessages.length ? (
                            <ul className="error-messages">
                                {errorMessages.map((errorMessage) => (
                                    <li key={errorMessage}>{errorMessage}</li>
                                ))}
                            </ul>
                        ) : null}

                        <LoginForm onSubmit={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}
