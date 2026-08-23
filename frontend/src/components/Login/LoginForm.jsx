import { useState } from "react";
import Button from "../shared/Button.jsx";
import NestlyLogo from "../shared/NestlyLogo.jsx"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {

  const navigate = useNavigate();

  const[inputs] = useState([
    {
      id:"email",
      name: "Email",
      type: "email",
    },
    {
      id: "password",
      name: "Password",
      type: "password",
    }
  ])

  const[formData, setFormData] = useState({
    email : '',
    password : '',
  })

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
    setLoading(true);
    try{
      const post = await axios.post('http://localhost:3000/api/auth/login', {email: formData.email, password: formData.password});
      const handleResponse = post.data;
      const token = handleResponse.token;
      localStorage.setItem("token", token);
      navigate("/dashboard")
    }
    catch(err){
      const data = err.response?.data;
      // backend returns the reason in `message` (and a typo'd `messsage` for the
      // "user doesn't exist" case) — surface whichever is present.
      const serverMessage = data?.message || data?.messsage;
      setError(serverMessage || "Unable to log in. Please try again.");
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className="bg-mellow flex flex-col rounded-xl p-6 sm:p-8 text-primary w-full max-w-md">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="flex items-center gap-1 justify-center pt-2 sm:pt-5">
          <NestlyLogo/>
          <h3 className="text-center text-2xl">Nestly</h3>
        </div>
        <div className="flex flex-col items-center justify-center pt-6 text-center">
          <h3 className="text-2xl sm:text-3xl">Welcome Back</h3>
          <p className="pt-2 text-sm sm:text-base">Sign in to continue to your workspace</p>
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
        <p className="w-full text-right pb-6 hover:cursor-pointer tracking-wide hover:underline text-sm pt-3 font-semibold">Forgot your Password?</p>
        <Button size = "large" className="ml-10">{loading ? "Signing in..." : "Continue to Workspace"}</Button>
      </form>
      <p className="text-center pt-4 text-sm sm:text-base">Don't have an account? <span className="font-semibold hover:underline"><Link to="/signup">Sign up here</Link></span></p>
      <div className="mt-4 text-center text-sm tracking-wide hover:underline"><Link to="/">Back to Home</Link></div>
    </div>
   );
}

export default LoginForm;
