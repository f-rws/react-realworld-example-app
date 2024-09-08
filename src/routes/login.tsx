import { useState } from "react";
import { isAxiosError } from "axios";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClientUsers } from "@/api/users";
import { useAuth } from "@/contexts/auth/useAuth.ts";
import { useUser } from "@/contexts/user/useUser.ts";
import { userAuthSchema } from "@/models/user.ts";

export const Route = createFileRoute("/login")({
    component: Login,
});

const formDataSchema = userAuthSchema.omit({ username: true });
type FormData = z.infer<typeof formDataSchema>;

function Login() {
    const { login } = useAuth();
    const { setUser } = useUser();

    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
    });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const onSubmit = async (requestData: FormData) => {
        setErrorMessages([]);

        try {
            const { data } = await apiClientUsers.postLogin({ user: requestData });
            const { token, ...rest } = data.user;
            login(token);
            setUser(rest);
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

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="email"
                                    placeholder="Email"
                                    {...register("email")}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    {...register("password")}
                                />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
