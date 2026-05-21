import { useState } from "react";

const LoginForm = () => {

  const[formData, setFormData] = useState({
    email : '',
    password : '',
  })  
  
  return ( 
    <form className=" bg-mellow flex flex-col">
      <h3>Nestly</h3>
      <div>
        <h3 className="">Welcome Back</h3>
        <p className="">Sign in to continue to your workspace</p>
      </div>
      <div>
        <label htmlFor="email">
          Email
        </label>
        <input id="email" type="email" required value={formData.email} onChange={}/>
      </div>
      <div>
        <label htmlFor="password">Password</label> 
        <input id="password" type="password" required value = {formData.password} onChange={} className=""/>
      </div>
    </form>
   );
}
 
export default LoginForm;