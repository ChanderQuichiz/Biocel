import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useState } from "react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  type signup = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
const [formSignup, setFormSignup] = useState<signup>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
})

  function writerFormSignup(event: React.ChangeEvent<HTMLInputElement>) {
    setFormSignup(
      {
        ...formSignup,
        [event.target.id]: event.target.value
      }
    )
  }
  async function sendForm(){
    if(formSignup.password !== formSignup.confirmPassword){
      alert('Passwords do not match')
      return
    }
    setFormSignup({
      ...formSignup,
      confirmPassword: undefined
    })
    console.log(formSignup)
    const response = await fetch('http://localhost:8020/user/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formSignup)
    })
   if(response.ok){
    alert('User created successfully')
   }else{
    alert('Error creating user')
   }
  }
 return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-[auto_0.60fr]">
          <div className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your email below to create your account
                </p>
              </div>
              <Field className="grid grid-cols-2 gap-4">
                            <Field>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Jorge Sebastian"
                  required
                  onChange={writerFormSignup}
                  value={formSignup?.firstName}
                />
              </Field>
                <Field>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Pascal Tomayo"
                  required
                  onChange={writerFormSignup}
                  value={formSignup?.lastName}
                />
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={writerFormSignup}
                  value={formSignup?.email}
                />
                <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription>
              </Field>
                            <Field className="grid grid-cols-2 gap-4">

              <Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required onChange={writerFormSignup} value={formSignup?.password} />
                  </Field>
                 
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                    <Input id="confirmPassword" type="password" required onChange={writerFormSignup} value={formSignup?.confirmPassword} />
                 
                <FieldDescription>
                  repeat password
                </FieldDescription>
              </Field>
              </Field>
              <Field>
                <Button type="button" className="cursor-pointer" onClick={sendForm}>Create Account</Button>
              </Field>
              <FieldSeparator/>
              <FieldDescription className="text-center">
                Already have an account? <Link to={'/account/signin'}>Sign In</Link>
              </FieldDescription>
            </FieldGroup>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://www.t-mobile.com/dialed-in/_admin/uploads/2025/11/phone-etiquette-1-1280x640.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
