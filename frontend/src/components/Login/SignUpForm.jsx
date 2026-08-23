import { useState } from "react";
import Button from "../shared/Button.jsx";
import NestlyLogo from "../shared/NestlyLogo.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignUpForm = () => {

  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    FullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const[inputs] = useState([
    {
      id:"FullName",
      name: "Full Name",
      type: "text",
    },
    {
      id:"email",
      name:"Email",
      type: "email",
    },
    {
      id:"password",
      name:"Password",
      type: "password",
    },
    {
      id:"confirmPassword",
      name:"Confirm Password",
      type: "password",
    }
  ])

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // catch mismatched passwords before hitting the server
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try{
      const post = await axios.post('http://localhost:3000/api/auth/register', {email: formData.email, password: formData.password, name: formData.FullName, confirmPassword: formData.confirmPassword});
      const handleResponse = post.data;
      console.log(handleResponse);
      navigate("/login")
    }
    catch(err){
      const serverMessage = err.response?.data?.message;
      setError(serverMessage || "Unable to create account. Please try again.");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <form className="bg-mellow flex flex-col rounded-xl p-6 sm:p-8 text-primary w-full max-w-md" onSubmit={handleSubmit}>
      <div className="flex items-center gap-1 justify-center pt-2 sm:pt-5">
        <NestlyLogo/>
        <h3 className="text-center text-2xl">Nestly</h3>
      </div>
      <div className="flex flex-col items-center justify-center pt-6 text-center">
        <h3 className="text-2xl sm:text-3xl">Create your account</h3>
        <p className="pt-2 text-sm sm:text-base">Join Nestly and start organizing mindfully</p>
      </div>

      {error && (
        <div role="alert" className="mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {
        inputs.map((input) => {
         return <div className="relative mt-8" key={input.id}>
                   <input className="peer bg-mellow outline-none border-b-2 w-full border-primary pb-2 pt-2"
                    id={input.id}
                    type={input.type}
                    name={input.id}
                    placeholder=" "
                    autoComplete="off"
                    required
                    value={formData[input.id]}
                    onChange={handleChange}
                  />
                  <label htmlFor={input.id}
                   className="absolute left-0 top-2 text-base transition-all duration-200 pointer-events-none
                     peer-focus:-top-4 peer-focus:text-sm
                     peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm">
                    {input.name}
                  </label>
                </div>
        })
      }
      
      <Button size = "large" className="ml-10 mt-6">{loading ? "Creating account..." : "Create Account"}</Button>
      <p className="text-center pt-4 text-sm sm:text-base">Already have an account? <span className="font-semibold hover:underline"><Link to="/login">Log in</Link></span></p>
      <div className="mt-4 text-center text-sm tracking-wide hover:underline"><Link to="/">Back to Home</Link></div>
    </form>
   );
}

export default SignUpForm;
