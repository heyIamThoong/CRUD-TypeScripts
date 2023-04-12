import instance from "./instance"


const signup = (user : any) => {
  return  instance.post("/auth/signup", user)
}


const signin = (user: any) => {
  return  instance.post("/auth/signin", user)
}

export { signin, signup}