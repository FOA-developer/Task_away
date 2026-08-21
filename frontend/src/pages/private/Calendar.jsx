import Layout from "../../components/shared/Layout.jsx"
import api from "../../api/api.js";
import TaskForm from "../../components/shared/TaskForm.jsx";
import Card from "../../components/shared/Card.jsx";
import TaskScreen from "../../components/shared/TaskScreen.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import DayPanel from "../../components/shared/DayPanel.jsx";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const nameMonth = currentMonth.toLocaleString('default', { month: 'long' })
  const getFirstDay = new Date(year, month, ).getDay();
  const getMonth =  new Date(year, month + 1, 0).getDate();
  const [members, setMembers] = useState([]);
  const boxes = Array.from({length : getMonth});
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
  const shortDays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
  const blanks = Array.from({ length: getFirstDay })
  const realDays = Array.from({ length: getMonth }, (_, index) => index + 1)
  const calendarBoxes = [...blanks, ...realDays]
  const filteredTasks = selectedDate 
  ? tasks.filter(task => new Date(task.dueDate).getTime() >= selectedDate.getTime())
  : []
  const fetchTasks = async () => {
    try{
      const res = await api.get("/task/get_task")
      setTasks(res.data.task)
    }catch(err){
      console.log(err)
    }
  }

  useEffect( () => {
    fetchTasks()
    const fetchMembers = async() => {
      try{
        const res = await  api.get("/workspace/get_currentWorkspace")
        setMembers(res.data.workspace.members)
        console.log(res.data.workspace.members)
      }
      catch(err){
        console.log(err)
      }
    }

    fetchMembers();
  },[])

  const handleTaskSuccess = () => {
    fetchTasks();
  }

  const handleDelete = async (task) => {
    try{
      await api.delete(`/task/delete_task/${task._id}`) 
      const updatedTask = tasks.filter((t) => t._id !==  task._id)
      setTasks(updatedTask)
    }
    catch(err){
      console.log(err)
    }
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }
  
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className= "flex flex-row justify-between">
        <h1 className="text-2xl font-bold text-primary font-playfair">Calendar </h1>
        <div className="flex flex-row gap-3 items-center">
          <ChevronLeft size={22} className="text-primary/80" onClick={() => {goToPreviousMonth()}} />
          <h3 className="text-primary text-xs md:text-sm">{nameMonth + " " + year}</h3>
          <ChevronRight size={22} className="text-priary/80" onClick={() => {goToNextMonth()}} />
        </div>
        </div>
        <div className="bg-whiter m-auto px-12 pb-4 flex items-center justify-center rounded-xl">
          <div className="md:grid grid-cols-7 gap-4 md:gap-6 lg:gap-8 hidden ">
            {days.map((day, index) => {
              return (
                <h2 className="text-primary capitalize text-sm pt-4" key={index}>{day}</h2>
              )
            })}
            {
              calendarBoxes.map((box, index) => {
                const tasksOnThisDay = tasks.filter(task => {
                  const due = new Date(task.dueDate)
                  return due.getDate() === box && due.getMonth() === month && due.getFullYear() === year
                })

                const isSelected = selectedDate && selectedDate.getDate() === box && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
                if (box === undefined) {
                  return <div key={index}></div> 
                }
                return (
                  <div key={index} className={`flex flex-col items-center justify-center h-16 md:h-20 lg:h-24 ${isSelected ? "bg-primary text-white" : "bg-[#F6F6F6] text-primary"} rounded-lg cursor-pointer`} onClick={() => setSelectedDate(new Date(year, month, box))}>
                    <h3 className="text-sm md:text-base">{box}</h3>
                    {tasksOnThisDay.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {tasksOnThisDay.map((_, i) => (
                          <span key={i} className="w-1 h-1 rounded-full bg-primary"></span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })
            }
          </div>
          <div className="grid grid-cols-7 gap-4 md:gap-6 lg:gap-8 md:hidden ">
            {shortDays.map((day, index) => {
              return (
                <h2 className="text-primary capitalize text-xs pt-4" key={index}>{day}</h2>
              )
            })}
             {
              calendarBoxes.map((box, index) => {
                const tasksOnThisDay = tasks.filter(task => {
                  const due = new Date(task.dueDate)
                  return due.getDate() === box && due.getMonth() === month && due.getFullYear() === year
                })

                const isSelected = selectedDate && selectedDate.getDate() === box && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
                if (box === undefined) {
                  return <div key={index}></div> 
                }
                return (
                  <div key={index} className={`flex flex-col items-center justify-center h-12 md:h-20 lg:h-22 ${isSelected ? "bg-primary text-white" : "bg-[#F6F6F6] text-primary"} rounded-lg cursor-pointer`} onClick={() => setSelectedDate(new Date(year, month, box))}>
                    <h3 className="text-sm md:text-base">{box}</h3>
                    {tasksOnThisDay.length > 0 && (
                      <div className="flex gap-0.5 mt-1">
                        {tasksOnThisDay.map((_, i) => (
                          <span key={i} className="w-1 h-1 rounded-full bg-primary"></span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })
            }
          </div>
        </div>
        {selectedDate && (
          <DayPanel onClose={() => setSelectedDate(null)}>
            <div className="flex flex-col gap-3 p-4">
              {filteredTasks.length === 0 ? (
                <p className="text-primary text-xs md:text-sm">No tasks are due</p> ) : 
                filteredTasks.map(task => (
                <Card 
                  key={task._id}
                  onEdit={() => {setEditingTask(task)}}
                  onClick={() => setSelectedTask(task)}
                  title={task.title}
                  onDelete={ () => {handleDelete(task)}}
                  assignedTo={task.assignedTo}
                  dueDate={task.dueDate}
                  status={task.status}
                />
              ))}
            </div>
          </DayPanel>
        )}
        {selectedTask && (
          <TaskScreen task={selectedTask} onClose={() => setSelectedTask(null)} 
           onEdit={() => {setEditingTask(selectedTask)}}
           onDelete = {() => {handleDelete(selectedTask)}}/>
        )}
        {editingTask && (
          <TaskForm 
           task={editingTask}
           onClose={() => setEditingTask(null)}
           onSuccess={() => {handleTaskSuccess()}}
           members={members}/>
        )}
      </div>
    </Layout>
    );
}

 
export default Calendar;