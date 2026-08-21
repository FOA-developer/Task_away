import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { LayoutDashboardIcon, Calendar1Icon, Users2Icon, SettingsIcon, ChevronDownIcon } from "lucide-react";
import NestlyLogo from "./NestlyLogo.jsx";


const links = [
  { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
  { name: "Calendar", icon: Calendar1Icon, path: "/calendar" },
  { name: "Teams", icon: Users2Icon, path: "/teams"},
  { name: "Settings", icon: SettingsIcon, path: "/settings" },
];

const Sidebar = ({ className }) => {
  const [active, setActive] = useState("/dashboard");
  const navigate = useNavigate()
  const location =  useLocation()

  return (
    <div className={`${className} bg-whiter flex flex-col h-full py-6 px-4 font-dmsans border-grey border-r`}>
      {/* Logo */}
      <div className="flex flex-row items-center gap-2 px-2 mb-5">
        <NestlyLogo />
        <h2 className="text-3xl text-primary">Nestly</h2>
      </div>

      <hr className="border-grey mb-5" />

      {/* Workspace dropdown */}
      <button className="flex flex-row items-center justify-between text-primary px-4 py-2.5 mb-6 font-medium border-grey border-b w-full">
        <span>Personal Workspace</span>
        <ChevronDownIcon size={22} className="text-grey" />
      </button>

      {/* Nav links */}
      <nav className="flex flex-col gap-1 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className={`flex flex-row items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors w-full text-left
                ${isActive
                  ? "bg-primary text-white"
                  : "text-primary hover:bg-grey/30"
                }`}
            >
              <Icon size={24} />
              {link.name}
            </button>
          );
        })}
      </nav>

      {/* User profile */}
      <hr className="border-grey mb-4" />
      <div className="flex flex-row items-center gap-3 px-2">
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C2523" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-primary leading-tight">John Doe</p>
          <p className="text-xs text-text-secondary">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
