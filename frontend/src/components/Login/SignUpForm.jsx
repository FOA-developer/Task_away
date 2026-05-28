import { useState } from "react";
import Button from "../shared/Button";
import NestlyLogo from "../NestlyLogo";
import { Link } from "react-router-dom";



const SignUpForm = () => {

  const[formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })


  const[inputs, setInput] = useState([
    {
      id:"Full Name",
      name: "Full Name",
      type: "text",
      class: "top-[270px]"
    },
    {
      id:"email",
      name:"Email",
      type: "email",
      class: "top-[345px]"
    },
    {
      id:"password",
      name:"Password",
      type: "password",
      class: "top-[415px]"
    },
    {
      id:"confirmPassword",
      name:"Confirm Password",
      type: "password",
      class: "top-[490px]"
    }
  ])

  const handleChange = (e) => {
    setFormData({
        ...formData,
      [e.target.name] : e.target.value
    })
  }

  const [focused, setFocused] = useState(null);



  return ( 
    <form className="bg-mellow flex flex-col rounded-xl p-8 text-primary my-20 max-w-xl min-w-lg">
      <div className="flex items-center gap-1 justify-center pt-5">
        <NestlyLogo/>
        <h3 className="text-center text-2xl">Nestly</h3>
      </div>
      <div className="flex flex-col items-center justify-center pt-6">
        <h3 className="text-3xl">Create your account</h3>
        <p className="pt-2">Join Nestly and start organizing mindfully</p>
      </div>
      {
        inputs.map((input, index) => {
         return <div className="mt-10" key={input.id}>
                   <label htmlFor={input.name}
                    className={`absolute left--2 transition-all duration-200 pointer-events-none
                     ${focused === input.id || formData[input.id] ? `${input.class} text-sm` : 'text-base'}`}>
                    {input.name}
                  </label>
                  <input className="peer  bg-mellow outline-none border-b-2 w-full border-primary pb-2" 
                    id={input.id} 
                    type={input.type} 
                    name={input.name}
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
      <Button size = "large">Create Account</Button>
      <p className="text-center pt-4">Already have an account? <span className="font-semibold hover:underline"><Link to="/login">Log in</Link></span></p>
      <div className="mt-4 text-center text-sm tracking-wide hover:underline"><Link to="/">Back to Home</Link></div>
    </form>
   );
}
 
export default SignUpForm;