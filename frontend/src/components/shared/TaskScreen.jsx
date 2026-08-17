import { X, AlignLeft, Calendar, Clock  } from "lucide-react";

const TaskScreen= ({ task, onClose }) => {
  if (!task) return null;

  const statusColors = {
    pending : "bg-pending",
    inProgress : "bg-progress",
    completed : "bg-done"
  }

  const dateColors ={
    pending : "bg-[#F6E4DC]",
    inProgress : "bg-[#D0DCE8]",
    completed : "bg-[#DEE5D6]"
  }

  const dateColor = dateColors[task.status] || "bg-[#F6E4DC]"
  const words = task.assignedTo.name.split(" ")
  const initials = words.map(word => word[0]).join("")

  const statusColor = statusColors[task.status] || "bg-pending"

  const due = new Date(task.dueDate)
  const month = due.toLocaleString('default', { month: 'long' })
  const day = due.getDate()

  const created = new Date(task.createdAt)
  const createdMonth = created.toLocaleString('default', { month: 'long' })
  const createdDay = created.getDate()

  const blocks = [
    {
      icon : Calendar,
      title: "created",
      description: month + day,
      bg: "bg-mellow"
    },
    {
      icon: Clock,
      title : "due",
      description : createdMonth + createdDay,
      bg : "bg-[#F6E4DC]"
    }
  ]


  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex md:justify-end items-center justify-center"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white flex flex-col
          w-11/12 max-w-md rounded-2xl
          md:w-96 md:h-screen md:rounded-none md:max-w-none"
      >
        <div className="flex flex-row justify-between items-center px-6 py-4"> 
          <h3 className="capitalize bg-tertiary rounded-xl p-2 text-xs md:text-sm text-primary">{task.status}</h3>
          <button onClick={onClose} className="self-end text-primary"><X size={26} /></button>
        </div>
        <div className={`h-1 w-full ${statusColor}`}></div>
        <div className="flex flex-col p-6">
         <h2 className="text-2xl font-playfair text-primary">{task.title}</h2>
         <div className="flex flex-row items-center gap-3 mt-6 pb-3 border-b border-grey">
           <div className={`${dateColor} px-2 rounded-xl md:text-sm text-xs flex items-center py-1 justify-center`}>{initials}</div>
           <h4 className="text-xs md:text-sm  text-primary">{task.assignedTo.name}</h4>
         </div>
         <div className="flex flex-row py-4 gap-2 items-center">
           <AlignLeft size={18} className="text-grey/90"/>
           <h4 className="uppercase text-grey text-xs ">description</h4>
         </div>
         <p className = "font-dmsans text-sm text-primary px-3 pb-8">{task.description}</p>
         <div className="grid grid-cols-2 gap-3 justify-between items-center border-t border-grey w-full pt-6">
          {
            blocks.map((block) => {
              const Icon = block.icon
              return (
                <div className={`flex flex-col p-3 ${block.bg} rounded-xl`}>
                 <div className="flex flex-row items-center gap-3">
                    <Icon size={12} className="text-grey"/>
                    <h4 className="capitalize text-grey text-xs">{block.title}</h4>
                 </div>
                 <p className="text-xs text-black/70 pl-5 pt-2">{block.description}</p>
                </div>
              )
            })
          }
         </div>
        </div>
      </div>
    </div>
  )
}

export default TaskScreen;