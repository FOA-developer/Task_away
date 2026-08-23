import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { LayoutDashboardIcon, Calendar1Icon, X, Plus, Users2Icon, SettingsIcon, ChevronDownIcon } from "lucide-react";
import NestlyLogo from "./NestlyLogo.jsx";
import api from "../../api/api.js";
import WorkspaceForm from "../shared/WorkspaceForm.jsx";


const links = [
  { name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard" },
  { name: "Calendar", icon: Calendar1Icon, path: "/calendar" },
  { name: "Teams", icon: Users2Icon, path: "/teams"},
  { name: "Settings", icon: SettingsIcon, path: "/settings" },
];

const Sidebar = ({ className }) => {
  const [openDropdown, setOpenDropDown] = useState(false)
  const navigate = useNavigate()
  const location =  useLocation()
  const [currentWorkspace, setCurrentWorkspace] = useState(null)
  const [workspace, setWorkspace] = useState([])
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [creatingWorkspace, setCreatingWorkspace] = useState(false)
  
  const getWorkspace = async () => {
    try{
      const res = await api.get("/workspace/get_workspace");
      setWorkspace(res.data.workspace)
    }catch(err){
      console.log(err)
    }
  }

  const handleSwitch = async (workspaceId) => {
    try{
       await api.patch("/workspace/switch_workspace", { newWorkspace : workspaceId})
       if(location.pathname !== "/dashboard"){
        navigate("/dashboard")
       }else{
        window.location.reload()
       }
    }
    catch(err){
      console.log(err)
    }
  }

  const getCurrentWorkspace = async () => {
    try{
      const res =  await api.get("/workspace/get_currentWorkspace");
      setCurrentWorkspace(res.data.workspace.name)
    }
    catch(err){
      console.log(err)
    }
  }


  useEffect(() => {

    const getMe = async () => {
      try {
        const res = await api.get("/auth/get_user")
        setUsername(res.data.user.name)
        setEmail(res.data.user.email)
      } catch (err) {
        console.log(err)
      }
    }

    getMe();
    getWorkspace();
    getCurrentWorkspace();
  },[])

  

  return (
    <div className={`${className} bg-whiter flex flex-col h-full py-6 px-4 font-dmsans border-grey border-r`}>
      {/* Logo */}
      <div className="flex flex-row items-center gap-2 px-2 mb-5">
        <NestlyLogo />
        <h2 className="text-3xl text-primary">Nestly</h2>
      </div>

      <hr className="border-grey mb-5" />

      {/* Workspace dropdown */}
      <div className="relative">
        <button className="flex flex-row items-center justify-between text-primary px-4 py-2.5 mb-4 font-medium border-grey border-b w-full " onClick={() => setOpenDropDown(true)}>
          <span className="capitalize">{currentWorkspace}</span>
          { !openDropdown ? (<ChevronDownIcon size={22} className="text-primary"/>) 
            : (<X size={22} className="text-primary" onClick={(e) => {
              e.stopPropagation()
              setOpenDropDown(false)}}
          />)}
        </button>

        {openDropdown && (
              <div className="absolute left-0 right-0 top-full bg-white rounded-lg shadow-md z-10 py-1">
                {workspace.map((space,index) => {
                  return (
                    <button className="block w-full text-left pl-8 pr-4 py-2 text-sm text-primary hover:bg-grey/20"
                      onClick={() => {handleSwitch(space._id)
                                      setOpenDropDown(false)
                                      getCurrentWorkspace()
                      }}
                      key={index}>
                      {space.name}
                    </button>
                  )
                })}
                <button className="flex flex-row gap-2 items-center w-full text-left px-4 py-2 text-sm text-primary hover:bg-grey/20" onClick={() => {setCreatingWorkspace(true); setOpenDropDown(false)}}>
                  <Plus size={20} />
                  <span>Create Workspace</span>
                </button>
              </div>
        )}
      </div>
      {creatingWorkspace && (
                  <WorkspaceForm onClose={() => setCreatingWorkspace(false)}
                   onSuccess={() => {getWorkspace()}}
      />)}

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
          <p className="font-semibold text-primary text-sm leading-tight">{username}</p>
          <p className="text-grey text-xs">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
