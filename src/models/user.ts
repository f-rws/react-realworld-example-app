import { z } from "zod";

export const userAuthSchema = z.object({
    username: z.string(),
    email: z.string().min(1, "必須項目です").email("メールアドレスを入力してください"),
    password: z.string().min(1, "必須項目です"),
});

export const userSchema = z.object({
    email: z.string().email(),
    token: z.string(),
    username: z.string(),
    bio: z.string(),
    image: z.string(),
});

export const authedUserSchema = userSchema.omit({ token: true });
