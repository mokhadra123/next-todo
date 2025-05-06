import { z } from "zod";

export const loginSchema = z.object({
    user_name: z.string({
        required_error: "user name is required",
        invalid_type_error: "user name must be string"
    })
    .min(3, { message: "minimum is 3 letters"})
    .max(20,{ message: "maximum is 20 letters"}),
    password: z.string({
        required_error: "password is required",
    })
    .min(6, { message: "minimum is 6 letters"})
    .max(40, { message: "maximum is 40 letters"}),
});

export type loginSchemaType = z.infer<typeof loginSchema>;