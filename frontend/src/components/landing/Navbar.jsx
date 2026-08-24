import NestlyLogo from "../shared/NestlyLogo.jsx";
import Button from "../shared/Button.jsx";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import {useState} from "react";
import { Link } from "react-router-dom";

 const links = [
        { name:"Home",
          link: "#Home",
        },
        {name:"How it Works",
          link: "#howitworks",
        },
        {name: "Features",
          link: "#features",
        },
        { name: "Login",
          route: "/login",
        }
      ]


const Navbar = () => {

  const[isOpen, setIsOpen] = useState(false)

  return (
    <navbar className="flex flex-row p-5 justify-between">
      <div className="flex flex-row gap-1 pl-2 pt-1">
        <NestlyLogo />
        <h3 className="font-semibold text-lg">Nestly</h3>
      </div>
      <div className="flex flex-row items-center gap-6 md:gap-10 justify-between pr-2 md:pr-6">
        <ul className="hidden md:flex flex-row gap-5 align-middle pt-2">
          {links.map((link) => {
            return <li className="font-semibold " key={link.name}>
              {link.route
                ? <Link to={link.route}>{link.name}</Link>
                : <a href={link.link}>{link.name}</a>}
            </li>
          })}
        </ul>
        <Button className="hidden md:inline-block align-top" size="small"><Link to="/signup">Get Started</Link></Button>
        <button className="flex md:hidden items-center text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <MdClose/> : <GiHamburgerMenu/>}
        </button>
      </div>
      {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-primary shadow-lg rounded-b-lg flex flex-col items-center gap-6 py-8 z-50 md:hidden">
            {links.map((link) => {
              return link.route
                ? <Link to={link.route} key={link.name} onClick={() => setIsOpen(false)} className="text-white hover:text-[#FE4E02] transition duration-300">{link.name}</Link>
                : <a href={link.link} key={link.name} onClick={() => setIsOpen(false)} className="text-white hover:text-[#FE4E02] transition duration-300">{link.name}</a>
            })}
            <Button size="small"><Link to="/signup" onClick={() => setIsOpen(false)}>Get Started</Link></Button>
          </div>
        )}
    </navbar>
   );
}
 
export default Navbar;