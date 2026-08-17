import Layout from "../../components/shared/Layout.jsx";
import api from "../../api/api.js";
import TaskPanel from "../../components/shared/TaskScreen.jsx";
import Card from "../../components/shared/Card.jsx";
import Skeleton from "../../components/shared/Skeleton.jsx";
import { useEffect, useState } from "react";
import Button from "../../components/shared/Button.jsx";
import { Plus } from "lucide-react";
import TaskForm from "../../components/shared/TaskForm.jsx";


const Dashoard = () => {
  const today = new Date();
  const [ tasks, setTasks ] = useState([])
  const [loading, setLoading ] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [members, setMembers] = useState([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [message, setMessage] = useState("")

  const fetchTasks = async () => {
    try{
      const res = await api.get("/task/get_task")
      setTasks(res.data.task)
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
      fetchTasks();
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
    },
  [])

  const handleTaskSuccess = (msg) => {
    fetchTasks();
    setMessage(msg)
  }
  

  
  return ( 
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl md:font-3xl font-semibold text-primary font-playfair">Personal Workspace</h1>
            <p className="font-primary">{today.toLocaleDateString()}</p>
          </div>
          <Button className="flex flex-row items-center gap-2" onClick={() => {
            setIsAddingTask(true)
          }}><Plus size={24} className="ml-5"/>New Task</Button>
        </div>
        <div>
          {/* tags go in here  */}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          { loading ? ([1, 2, 3, 4].map((num) => (
                        <Skeleton key={num} />
                      ))) : tasks.length === 0 ? (<p>No tasks found</p>) : (
                      tasks.map((task) => (
                        <Card key={task._id} onClick={() => setSelectedTask(task)} title={task.title} assignedTo={task.assignedTo} dueDate={task.dueDate} status={task.status}></Card>
                      ))
          )}
        </div>
      </div>
      {selectedTask && (
        <TaskPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      {isAddingTask && (
      <TaskForm 
        onClose={() => setIsAddingTask(false)} 
        onSuccess={handleTaskSuccess} 
        members={members} 
      />
    )}
    {message && <p>{message}</p>}.
    </Layout>
   );
}
 
export default Dashoard;