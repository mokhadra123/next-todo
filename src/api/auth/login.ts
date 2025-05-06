import { ILoginFormState } from "@/interfaces/auth"
import { apiHandler } from "../api-handler";

export const userLogin = async (formState: ILoginFormState) => {
    const formData = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
        formData.set(key, value)
    })

    try {
        return await apiHandler<{ token: string }>({
            endpoint: "/api/login",
            method: "POST",
            body: formData,
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log(err.message);
        } else {
            console.log("Non‑Error thrown:", err);
        }
    }
} 