import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiClientUsers } from "@/api/users";
import { useAuth } from "@/contexts/auth/useAuth.ts";
import { useAuthedUser } from "@/contexts/authed-user/useAuthedUser.ts";
import { userAuthSchema } from "@/models/user.ts";

export const Route = createFileRoute("/register")({
    component: Register,
});

const formDataSchema = userAuthSchema;
type FormData = z.infer<typeof formDataSchema>;

function Register() {
    const { login } = useAuth();
    const { setAuthedUser } = useAuthedUser();

    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
    });

    const onSubmit = async (requestData: FormData) => {
        setErrorMessages([]);

        try {
            const { data } = await apiClientUsers.post({ user: requestData });
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
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <Link to={"/login"}>Have an account?</Link>
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
                                    type="text"
                                    placeholder="Username"
                                    {...register("username")}
                                />
                            </fieldset>
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
                            <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
