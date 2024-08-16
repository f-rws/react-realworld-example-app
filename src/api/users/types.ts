import { z } from "zod";
import { userAuthSchema, userSchema } from "../../models/user.ts";

const postLoginRequestUserSchema = userAuthSchema.omit({ username: true });
const postLoginResponseUserSchema = userSchema;

export type PostLoginRequest = {
    user: PostLoginRequestUser;
};
type PostLoginRequestUser = z.infer<typeof postLoginRequestUserSchema>;

export type PostLoginResponse = {
    user: PostLoginResponseUser;
};
export type PostLoginResponseUser = z.infer<typeof postLoginResponseUserSchema>;
