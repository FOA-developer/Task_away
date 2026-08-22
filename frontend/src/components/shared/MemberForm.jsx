import { X } from "lucide-react";
import Button from "../../components/shared/Button.jsx";
import { useState} from 'react';
import api from "../../api/api.js";

const MemberForm = ({onClose, onSuccess}) => {
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState("")
  

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      await api.patch("/workspace/add_member", { userEmail: email })
      onSuccess()
      onClose()
    }catch(err){
      console.log(err);
      setFormError(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center"
      onClick={onClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-whiter flex flex-col w-11/12 max-w-sm rounded-2xl p-4">
        <div className="flex flex-row  gap-20 items-center ">
          <X size={24} onClick={
            (e) => {
              e.stopPropagation();
              onClose();
            }
          }/>
          <h4 className="text-base md:text-lg text-center font-semibold">Add Member</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="email" className="text-xs md:text-sm text-primary">Email</label>
            <input
              required
              name="email"
              value={email}
              type="email"
              onChange={handleChange}
              className="border-b border-grey focus:outline-none focus:border-primary text-xs md:text-sm p-2"
              />
          </div>
          { formError && <p className="text-red-500 p-4 text-xs">{formError}</p>}
          <Button size="small" className="ml-22 mt-4">Add</Button>
        </form>
      </div>
    </div> 
  )
}

export default MemberForm;