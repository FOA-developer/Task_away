const Card = ({ title, assignedTo, dueDate, status, onClick}) => {
  const words = assignedTo.name.split(" ")
  const initials = words.map(word => word[0]).join("")
  const due = new Date(dueDate)
  const month = due.toLocaleString('default', { month: 'short' })
  const day = due.getDate()
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

  const dateColor = dateColors[status] || "bg-[#F6E4DC]"
  const statusColor = statusColors[status] || "bg-pending"

  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1)

 return (
  <div className="bg-whiter px-4 py-5 flex flex-col shadow-sm rounded-xl " onClick={onClick}>
    <div className={`px-3 w-full h-1 ${statusColor}`} />
    <h4 className="font-playfair py-4 text-sm md:text-base">{formattedTitle}</h4>
    <div className="flex flex-row w-full justify-between">
      <div className="flex flex-row justify-between items-center gap-3 ">
        <div className={`${dateColor} px-2 rounded-xl md:text-sm text-xs flex items-center py-1 justify-center`}>
          {initials}
        </div>
        <p className="md:hidden inline font-dmsans text-xs md:text-sm">{assignedTo.name.split(" ")[0]}</p>
        <p className="hidden md:inline font-dmsans text-xs md:text-sm">{assignedTo.name}</p>
      </div> 
      <div className={`${dateColor} px-3 rounded-lg text-primary text-xs md:text-sm flex items-center justify-center`}>
        {`${month} ${day}`}
      </div>
    </div>
  </div>
 )
}

export default Card;