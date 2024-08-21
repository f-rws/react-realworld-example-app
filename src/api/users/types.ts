import { z } from "zod";
import { userAuthSchema, userSchema } from "../../models/user.ts";

const postRequestUserSchema = userAuthSchema;
const postResponseUserSchema = userSchema;

export type PostRequest = {
    user: PostRequestUser;
};
type PostRequestUser = z.infer<typeof postRequestUserSchema>;

export type PostResponse = {
    user: PostResponseUser;
};
export type PostResponseUser = z.infer<typeof postResponseUserSchema>;

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
