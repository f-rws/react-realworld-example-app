import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userAuthSchema } from "../models/user.ts";

export const Route = createFileRoute("/register")({
    component: Register,
});

const formDataSchema = userAuthSchema;
type FormData = z.infer<typeof formDataSchema>;

function Register() {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
    });

    // TODO: 登録処理を追加する
    const onSubmit = async (requestData: FormData) => {
        console.log(requestData);
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

                        {/* TODO: APIレスポンスのエラーメッセージを表示させる */}
                        {/*<ul className="error-messages">*/}
                        {/*    <li>That email is already taken</li>*/}
                        {/*</ul>*/}

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
