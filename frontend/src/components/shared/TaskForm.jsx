import api from "../../api/api.js";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../shared/Button.jsx"

const TaskForm = ({task, onClose, onSuccess, members}) => {
  const[formError, setFormError] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        if (formData.description.length < 10) {
          setFormError("The description should be more than ten characters")
          return;
        }
        if(formData.title.length < 7 ){
          setFormError("The title must be mroe than seven characters")
          return;
        }
        await api.patch(`/task/update_task/${task._id}`, formData)
        onSuccess("Task updated successfully!")
      } else {
        await api.post("/task/create_task", formData)
        onSuccess("Task created  successfully!")
      } 
      onClose();    
    } catch (err) {
      console.log(err)
    }
  }
  

  const [formData, setFormData] = useState(
    task ? { title: task.title, description: task.description, status: task.status, dueDate: task.dueDate, assignedTo: task.assignedTo}
    : { title: '', description: '', status: '', dueDate: '' , assignedTo: ''})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 4)


  return(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex md:justify-end items-center justify-center"
    onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="bg-white flex flex-col w-11/12 max-w-md rounded-2xl md:w-96 md:h-screen md:rounded-none md:max-w-none">
        <form onSubmit={handleSubmit}>
          <div className= "flex flex-col p-4  gap-4">
            { task && <h1 className="text-primary text-lg text-center md:text-xl font-semibold">Edit Task</h1>}
            { !task && <h1 className="text-primary text-lg text-center md:text-xl font-semibold">Create Task</h1>}
            <div className="flex flex-col ">
              <label htmlFor="title" className="text-primary  text-sm ">Title</label>
              <input type="text" id="title" name="title" value={formData.title} minLength={5} maxLength={300} className="border-b border-grey focus:outline-none focus:border-primary text-xs md:text-sm p-2" onChange={handleChange} required/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm">Description</label>
              <textarea className="border-b border-grey focus:outline-none  focus:border-primary p-2 text-xs md:text-sm" minLength={10} maxLength={900} required id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
            </div>
            <div className="flex flex-col">
              <label className="text-xs md:text-sm">Due Date</label>
             <DatePicker
                selected={formData.dueDate}
                onChange={(date) => setFormData({ ...formData, dueDate: date })}
                dropdownMode="select"
                showYearDropdown
                className="border-b border-grey focus:outline-none focus:border-primary"
                showMonthDropdown   
                minDate={minDate}
                maxDate={maxDate}
                required/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="assignedTo" className="text-xs md:text-sm text-primary">Assign To</label>
              <select name="assignedTo" className="text-xs md:text-sm mt-4" value={formData.assignedTo} onChange={handleChange} required>
                <option value="">Select</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>{member.name}</option>
                ))}
              </select>
            </div>
            {task && (
              <div>
                <label>
                  <input type="radio" name="status" value="pending" checked={formData.status === "pending"} onChange={handleChange} />
                  Pending
                </label>
                <label>
                  <input type="radio" name="status" value="inProgress" checked={formData.status === "inProgress"} onChange={handleChange} />
                  In Progress
                </label>
                <label>
                  <input type="radio" name="status" value="completed" checked={formData.status === "completed"} onChange={handleChange} />
                  Completed
                </label>
              </div>
            )}
          </div>
          {formError && <p className="p-4 text-xs md:text-sm text-red-400">{formError}</p>}
          <div className="flex justify-center items-center" >
           <Button size="small" className="mt-10 mb-6" >Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}


export default TaskForm;