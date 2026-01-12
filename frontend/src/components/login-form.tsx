import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { accessSignin } from "@/services/UserService"
import type { User } from "@/types/user"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  type signin = {
    email: string
    password: string
  }
  const navegate = useNavigate()
const [signinForm, setSigninForm] = useState<signin>({
    email: "",
    password: "",
  });

  function writerSigninForm(event: React.ChangeEvent<HTMLInputElement>) {
    setSigninForm({
      ...signinForm,
      [event.target.id]: event.target.value,
    })
  }
  async function sendForm() {
    const emptyFields = Object.entries(signinForm).filter(([, value]) => !value);
    if (emptyFields.length > 0) {
      alert("Please fill in all fields.");
      return;
      }
   await accessSignin(signinForm as signin as User)
  navegate("/account/userinfo")
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={writerSigninForm}
                  value={signinForm.email}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required value={signinForm.password} onChange={writerSigninForm} />
              </Field>
              <Field>
                <Button type="button" onClick={sendForm} className="cursor-pointer">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link to="/account/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
