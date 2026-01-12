import type { User } from "@/types/user"

export async function saveFormSignup(formSignup: User) {
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
export async function accessSignin(signinForm:User){
          const response = await fetch(`http://localhost:8020/user/access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinForm)
      });
   if(response.ok){
    const data = await response.json();
    localStorage.setItem("account", JSON.stringify(data));
  }
    else alert("Login failed. Please check your credentials.")
}