"use server"
import { ILoginFormState } from "@/interfaces/auth";
import { userLogin } from "@/api/auth/login";
import { cookies } from "next/headers";

export async function loginAction(formData: ILoginFormState) {
    try {
        const response = await userLogin(formData);
        if (response?.token) {
            // Set the token in cookies
            const cookieStore = await cookies();
            cookieStore.set("auth_token", response.token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
            });
            return {token: response.token, adminData: response.adminData};
        }
        return { status: "error", error: "Login failed" };
    } catch (error) {
        console.error("Login error:", error);
        return { status: "error", error: "An error occurred during login" };
    }
}