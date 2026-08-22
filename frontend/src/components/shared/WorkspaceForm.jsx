import { X } from "lucide-react";
import { useState } from "react";
import api from "../../api/api.js";
import Button from "../shared/Button.jsx"

const WorkspaceForm = ({onClose, onSuccess}) => {
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();
      await api.post("/workspace/create_workspace", { name })
      onSuccess();
      onClose()
    }
    catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setName(e.target.value)
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
            <h4 className="text-base md:text-lg text-center font-semibold">New Workspace</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="name" className="text-xs md:text-sm text-primary">Name</label>
              <input
                required
                name="name"
                value={name}
                type="text"
                onChange={handleChange}
                className="border-b border-grey focus:outline-none focus:border-primary text-xs md:text-sm p-2"
                />
            </div>
            <Button size="small" className="ml-22 mt-4">Create</Button>
          </form>
        </div>
      </div> 
    )
}

export default WorkspaceForm;