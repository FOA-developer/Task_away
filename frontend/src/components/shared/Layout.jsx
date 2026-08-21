import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  LayoutDashboardIcon,
  Calendar1Icon,
  Users2Icon,
  SettingsIcon,
  UserCircleIcon,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import NestlyLogo from "./NestlyLogo.jsx";

const navLinks = [
  { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard"},
  { name: "Calendar", icon: Calendar1Icon, path: "/calendar" },
  { name: "Teams", icon: Users2Icon, path: "/teams" },
  { name: "Profile", icon: UserCircleIcon, path: "/settings"},
];

const Layout = ({ children }) => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="flex h-screen font-dmsans">
      {/* Desktop sidebar */}
      <Sidebar className="hidden md:flex w-64 shrink-0" />

      {/* Right column: mobile header + main + mobile bottom nav */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Mobile header */}
        <header className="flex md:hidden items-center justify-between bg-white px-5 py-4 border-b border-grey">
          <div className="flex items-center gap-2">
            <NestlyLogo />
            <span className="font-bold text-xl text-primary">Nestly</span>
          </div>
          <button className="p-2 rounded-xl hover:bg-grey/30 text-primary transition-colors">
            <SettingsIcon size={22} />
          </button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-white p-6">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="flex md:hidden items-center justify-around bg-whiter border-t border-grey px-2 py-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-colors text-xs font-medium
                  ${isActive ? "text-primary font-semibold" : "text-grey"}`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-primary" : "text-grey"}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {link.name}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
