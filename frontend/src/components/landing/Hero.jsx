import Navbar from "./Navbar.jsx";
import Button from "../shared/Button.jsx";
import { Link } from "react-router-dom";

const Hero = () => {
  return ( 
    <div className="grid-background min-h-screen text-primary">
      <section className="relative z-10 flex flex-col" id="Home">
        <Navbar/>
        <div className="flex flex-col justify-center items-center pt-20 text-center">
          <h1 className="text-7xl font-playfair loading-loose">Your tasks, your rhythm.<br></br>Stay in flow.</h1>
          <p className="m-auto w-[50%] pt-7 text-grey">Organize your life beautifully, collaborate effortlessly, and never lose track of what matters. A mindful approach to productivity that respects your time and energy.</p>
          <Button className="mt-6  transition duration-" size="medium"><Link to="/login">Get Started</Link></Button>
        </div>
      </section>
    </div>
   );
}
 
export default Hero;