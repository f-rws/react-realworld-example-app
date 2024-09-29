import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/models/user.ts";
import { z } from "zod";

const formDataSchema = userAuthSchema.omit({ username: true });
type FormData = z.infer<typeof formDataSchema>;

type Props = {
    onSubmit: SubmitHandler<FormData>;
};

export const LoginForm = (props: Props) => {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
    });
    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
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
        </>
    );
};
