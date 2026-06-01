import NestlyLogo from "../NestlyLogo.jsx";
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
          link: "",
        }, 
        { name: "Login",
          link: "",
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
      <div className="flex flex-row gap-10 justify-between pr-6">
        <ul className="hidden md:flex flex-row gap-5 align-middle pt-2">
          {links.map((link) => {
            return <li className="font-semibold " key={link.name}><a href={link.link}>{link.name}</a></li>
          })}
        </ul>
        <Button className="align-top" size="small"><Link to="/login">Get Started</Link></Button>
      </div>
      <button className="flex md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <GiHamburgerMenu/> : <MdClose/>}
      </button>
      {isOpen && (
          <div className="absolute top-14 right-0 w-full rounded-lg flex flex-col items-center gap-6 py-8 z-50">
            {links.map((link) => {
              return <a href={link.link} key={link.name} onClick={() => setIsOpen(false)} className="text-white hover:text-[#FE4E02] transition duration-300">{link.name}</a>
            })}
          </div>
        )}
    </navbar>
   );
}
 
export default Navbar;