import { Copyright } from 'lucide-react';
import NestlyLogo from "../../components/shared/NestlyLogo";
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-mellow">
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 gap-6 py-6">
        <div className="flex flex-col gap-3 items-start md:pl-10 pl-0">
          <div className="flex flex-row items-center gap-3">
            <NestlyLogo />
            <h2 className="font-playfair text-primary text-base md:text-lg">Nestly</h2>
          </div>
          <p className="text-xs md:text-md text-grey">A mindful approach to task management.</p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <h4 className="text-sm md:text-base font-playfair text-primary text-playfair">Quick Links</h4>
          <p className="text-xs text-left hover:text-primary text-grey"><a href="#howitworks">How It Works</a></p>
          <p className="text-xs text-left hover:text-primary text-grey"><a href="#features">Features</a></p>
          <p className="text-xs text-left hover:text-primary text-grey"><Link to="/login">Login</Link></p>
        </div>
      </div>
      <div className="w-[90%] m-auto h-px bg-grey"/>
      <div className="flex justify-center items-center  text-grey p-4 text-xs">
        <Copyright className="w-4 h-4" />
        <span>2026 Nestly. All rights reserved.</span>
      </div>
    </div>
  )
}

export default Footer;