const Card = ({ title, assignedTo, dueDate }) => {
  const words = assignedTo.name.split(" ")
  const initials = words.map(word => word[0]).join("")
  const due = new Date(dueDate)
  const month = due.toLocaleString('default', { month: 'short' })
  const day = due.getDate()
  
 return (
  <div className="bg-whiter p-4 flex flex-col">
    <h4>{title}</h4>
    <div className="flex flex-row">
      <div className="flex flex-row justify-between">
        <div>
          {initials}
        </div>
        <p className="md:hidden inline">{assignedTo.name.split(" ")[0]}</p>
        <p className="hidden md:inline">{assignedTo.name}</p>
      </div>
      <div>
        {`${month} ${day}`}
      </div>
    </div>
  </div>
 )
}

export default Card;