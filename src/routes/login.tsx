import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "../models/user.ts";

export const Route = createFileRoute("/login")({
    component: Login,
});

const formDataSchema = userAuthSchema.omit({ username: true });
type FormData = z.infer<typeof formDataSchema>;

function Login() {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/register">Need an account?</a>
                        </p>

                        {/* TODO: APIレスポンスのエラーメッセージを表示させる */}
                        {/*<ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul>*/}
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
