"use server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/login-form";


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