import { LayoutDashboardIcon, Calendar1Icon, ClipboardCheckIcon, Users2Icon,  SettingsIcon } from "lucide-react";
import NestlyLogo from "../NestlyLogo.jsx";

const links =[
  {
    name: "Dashboard",
    icon: LayoutDashboardIcon
  },
  {
    name: "Calendar",
    icon: Calendar1Icon
  },
  {
    name: "Tasks",
    icon: ClipboardCheckIcon
  },
  {
    name: "Teams",
    icon: Users2Icon
  },
  {
    name: "Settings",
    icon: SettingsIcon
  }
]

const Sidebar = ({className}) => {
  return ( 
    <div className={`${className}`}>
      <div className="flex flex-col">
        <div className="flex flex-row gap-2">
          <NestlyLogo/>
          <h2 className="">Nestly</h2>
        </div>
        <nav className="flex flex-col">
          {links.map((link) => {
            return <button className="" key={link.name}>{link.name}</button>
          })}
        </nav>
      </div>
    </div>
   );
}
 
export default Sidebar;