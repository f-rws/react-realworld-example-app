import { z } from "zod";
import { userSchema } from "@/models/user.ts";

const getResponseUserSchema = userSchema;

export type GetResponse = {
    user: GetResponseUser;
};
type GetResponseUser = z.infer<typeof getResponseUserSchema>;
