"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaType } from "@/validation/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction } from "@/app/(auth)/login/page";
import { useTransition } from "react";
import { useAppDispatch } from "@/lib/slice-hooks";
import { login } from "@/lib/features/auth/auth-slice";
import { useRouter } from "next/navigation";

interface Ifield {
    label: string;
    name: "user_name" | "password";
    placeholder: string;
    type?: string;
}

const loginFormData: Ifield[] = [
    {
        label: "User Name",
        name: "user_name",
        placeholder: "Enter User Name"
    }, {
        label: "Password",
        name: "password",
        type:"password",
        placeholder: "Enter password"
    }
];

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        setError
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (formState: loginSchemaType) => {
        startTransition(async () => {
            const result = await loginAction(formState);
            if (result.success) {
                dispatch(login(result.data));
                router.push("/");
            } else {
                setError("root", { message: result.error });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
                {
                    loginFormData.map(({label, name, placeholder, type}) => (
                    <div key={name} className="flex flex-col space-y-1.5">
                        <Label htmlFor={name}>{label}</Label>
                        <Input 
                            className="h-[38px]" 
                            id={name} 
                            placeholder={placeholder}
                            {...register(name)}
                            type={type ?? "text"}
                            disabled={isPending}
                        />
                        {errors?.[name] && <p className="text-sm text-red-500">{errors?.[name].message}</p>}
                    </div>
                    ))
                }
                {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}
                <Button type="submit" className="cursor-pointer" disabled={isPending}>
                    {isPending ? "Logging in..." : "Login"}
                </Button>
            </div>
        </form>
    )
}

export default LoginForm