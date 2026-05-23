import { useState } from "react";
import Button from "../shared/Button";
import NestlyLogo from "../NestlyLogo"
import { Link } from "react-router-dom";

const LoginForm = () => {

  const[inputs, setInputs] = useState([
    {
      id:"email",
      name: "Email",
      class: "top-[280px]"
    },
    {
      id: "password",
      name: "Password",
      class: "top-[350px]"
    }
  ])

  const[focused, setFocused] = useState(null)

  const[formData, setFormData] = useState({
    email : '',
    password : '',
  })  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  

  return ( 
    <form className="bg-mellow flex flex-col rounded-xl p-8 text-primary max-w-xl min-w-lg">
      <div className="flex items-center gap-1 justify-center pt-5">
        <NestlyLogo/>
        <h3 className="text-center text-2xl">Nestly</h3>
      </div>
      <div className="flex flex-col items-center justify-center pt-6">
        <h3 className="text-3xl">Welcome Back</h3>
        <p className="pt-2">Sign in to continue to your workspace</p>
      </div>
      {
        inputs.map((input, index) => {
         return <div className="mt-10" key={input.id}>
                   <label htmlFor={input.id}
                    className={`absolute left--2 transition-all duration-200 pointer-events-none
                     ${focused === input.id || formData[input.id] ? `${input.class} text-sm` : 'text-base'}`}>
                    {input.name}
                  </label>
                  <input className="peer  bg-mellow outline-none border-b-2 w-full border-primary pb-2" 
                    id={input.id} 
                    type={input.id} 
                    name={input.id}
                    autoComplete="off" 
                    required 
                    value={formData[input.id]} 
                    onChange={handleChange} 
                    readOnly 
                    onFocus={(e) => {e.target.removeAttribute('readonly')
                      setFocused(input.id)}
                    }
                  />
                </div>
        })
      }
      <p className="w-full text-right pb-6 hover:cursor-pointer tracking-wide hover:underline text-sm pt-3 font-semibold">Forgot your Password?</p>
      <Button size = "large">Continue to Workspace</Button>
      <p className="text-center pt-4">Don't have an account? <span className="font-semibold hover:underline"><Link to="/signup">Sign up here</Link></span></p>
      <div className="mt-4 text-center text-sm tracking-wide hover:underline"><link to="/welcome">Back to Home</link></div>
    </form>
   );
}
 
export default LoginForm;