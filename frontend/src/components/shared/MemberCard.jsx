import { MoreVertical } from "lucide-react";
import { X } from "lucide-react"
import Block from "../../components/shared/Block.jsx";
import api from "../../api/api.js";
import { useState } from 'react'; 


const MemberCard = ({member}) => {
  const [isOpen, setIsOpen] = useState(false)

  const removeMember = async(member) => {
    try{
      await api.delete(`/workspace/delete_member/${member._id}`)
      setIsOpen(false)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
      <div className="flex flex-row justify-between gap-3 min-w-70 p-4 bg-whiter rounded-lg shadow-sm hover:shadow-md active:shadow-lg transition-shadow duration-150 cursor-pointer">
        <div className="flex flex-row items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2C2523" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="md:text-base text-sm text-primary">{member.name}</h4>
            <p className="text-xs md:text-sm text-grey">{member.email}</p>
          </div>
        </div>
        <div className="relative">
        { !isOpen ? (<MoreVertical size={20} className="" onClick={
          (e) => {
            e.stopPropagation();
            setIsOpen(true)
          }}/>) : (<X size={20}  onClick={
            () => {
              setIsOpen(false)
            }}/>) 
        }
        {isOpen && (
            <div className="absolute right-0 top-6 z-10">
              <Block onLogout={() => {removeMember(member._id)}}>Remove</Block>
            </div>
          )}
        </div>
      </div>
  )
}

export default MemberCard;