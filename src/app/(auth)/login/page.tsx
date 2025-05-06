"use server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";
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
      return { success: true, data: response };
    }
    return { success: false, error: "Login failed" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An error occurred during login" };
  }
}

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-[300px] md:w-[500px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login Form</CardTitle>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage