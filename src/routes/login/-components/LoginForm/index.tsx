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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formDataSchema),
    });
    return (
        <>
            <form onSubmit={handleSubmit(props.onSubmit)}>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        aria-label="email"
                        placeholder="Email"
                        aria-invalid={!!errors.email?.message}
                        aria-errormessage={"email-error"}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p
                            id={"email-error"}
                            className="error-messages"
                        >
                            {errors.email?.message}
                        </p>
                    )}
                </fieldset>
                <fieldset className="form-group">
                    <input
                        className="form-control form-control-lg"
                        type="text"
                        aria-label="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                    {errors.password && <p className="error-messages">{errors.password?.message}</p>}
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
            </form>
        </>
    );
};
