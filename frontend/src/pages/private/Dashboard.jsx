import Layout from "../../components/shared/Layout.jsx";
import api from "../../api/api.js";
import TaskScreen from "../../components/shared/TaskScreen.jsx";
import Card from "../../components/shared/Card.jsx";
import Skeleton from "../../components/shared/Skeleton.jsx";
import { useEffect, useState } from "react";
import Button from "../../components/shared/Button.jsx";
import Switcher from "../../components/shared/Switcher.jsx";
import Block from "../../components/shared/Block.jsx"
import { Plus, ChevronDownIcon } from "lucide-react";
import TaskForm from "../../components/shared/TaskForm.jsx";


const Dashoard = () => {
  const today = new Date();
  const [editingTask, setEditingTask] = useState(null)
  const [currentWorkspace, setCurrentWorkspace] = useState("")     
  const [ tasks, setTasks ] = useState([])
  const [workspace, setWorkspace] = useState([])
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false)
  const [loading, setLoading ] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [members, setMembers] = useState([])
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [message, setMessage] = useState("")
  const [deleteTaskId, setDeleteTaskId] = useState(null)
  const [networkError, setNetworkError] = useState(false)

  const fetchTasks = async () => {
    try{
      const res = await api.get("/task/get_task")
      setTasks(res.data.task)
      console.log(res.data)
    }
    catch(err){
      if (!err.response) {
        setNetworkError(true)
      }
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

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


  useEffect(() => {
      fetchTasks();
      const fetchMembers = async() => {
        try{
          const res = await  api.get("/workspace/get_currentWorkspace")
          setMembers(res.data.workspace.members)
          setCurrentWorkspace(res.data.workspace.name)
          console.log(res.data.workspace.members)
        }
        catch(err){
          console.log(err)
        }
      }

      fetchMembers();
      getWorkspace();
    },
  [])

  const handleTaskSuccess = (msg) => {
    fetchTasks();
    setMessage(msg)
    setTimeout(() => {
      setMessage("")
    }, 3000)
  }

  const handleDelete = async (task) => {
    try{
      await api.delete(`/task/delete_task/${task._id}`) 
      const updatedTask = tasks.filter((t) => t._id !==  task._id)
      setTasks(updatedTask)
    }
    catch(err){
      if (!err.response) {
        setNetworkError(true)
      }
      console.log(err)
    }
  }
  

  
  return ( 
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <div>
            <div className="flex flex-row gap-3 items-center">
              <h1 className="text-2xl md:font-3xl font-semibold text-primary font-playfair">{currentWorkspace}</h1>
              <ChevronDownIcon size={20} className="text-primary flex md:hidden" onClick={() => setIsSwitcherOpen(true)}/>
            </div>
            <p className="font-primary">{today.toLocaleDateString()}</p>
          </div>
          <Button className="flex flex-row items-center gap-2" size="small" onClick={() => {
            setIsAddingTask(true)
          }}><Plus size={16} className="ml-5"/>New Task</Button>
        </div>
        <div>
          {/* tags go in here  */}
        </div>
        <div className="grid grid-cols-1 gap-4 mt-4">
          { loading ? ([1, 2, 3, 4].map((num) => (
                        <Skeleton key={num} />
                      ))) : tasks.length === 0 ? (<p>No tasks found</p>) : (
                      tasks.map((task) => (
                        <Card key={task._id} onClick={() => setSelectedTask(task)} title={task.title} assignedTo={task.assignedTo} dueDate={task.dueDate} status={task.status} onEdit={() => {setEditingTask(task)} } onDelete={() => {handleDelete(task)}}></Card>
                      ))
          )}
        </div>
      </div>
      {selectedTask && (
        <TaskScreen task={selectedTask} onClose={() => setSelectedTask(null)}  onEdit={() => {setEditingTask(selectedTask)} } 
        onDelete={() => {handleDelete(selectedTask)}}/>
      )}
      {isAddingTask && (
      <TaskForm 
        onClose={() => setIsAddingTask(false)} 
        onSuccess={handleTaskSuccess} 
        members={members} 
      />
    )}
    {editingTask && (
      <TaskForm 
        task={editingTask}
        onClose={() => setEditingTask(null)} 
        onSuccess={handleTaskSuccess} 
        members={members} 
      />
    )}
    {isSwitcherOpen && (
      <Switcher onClose={() => setIsSwitcherOpen(false)} onSuccess={getWorkspace}>
        {workspace.map((space) => (
          <Block key={space._id} onLogout={() => handleSwitch(space._id)}>
            {space.name}
          </Block>
        ))}
      </Switcher>
    )}
    {message && <p className="text-xs md:text-sm font-primary">{message}</p>}
    { networkError && (<p className="text-sm md:text-base font-primary">Network Error.... Pls check your internet connectionn</p>)}
    </Layout>
   );
}
 
export default Dashoard;