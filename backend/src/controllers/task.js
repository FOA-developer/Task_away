import { Task } from "../models/task.js";
import { Workspace } from "../models/workspace.js";

const createTask = async (req, res) => {
  try{
    const{title, description, status, dueDate} = req.body;
      if(!title || !description || !status || !dueDate ){
        return res.status(400).json({
          message: "All field are required"
        })
      }


      const owner = req.user._id;
      const assignedTo = req.body.assignedTo || owner
      const workspace = req.user.currentWorkspace
      const verifyWorkspace = await Workspace.findById(workspace);
      if(!verifyWorkspace){
        return res.status(404).json({
          message: "Workspace not found"
        })
      }

      const validateMember = verifyWorkspace.members.includes(assignedTo);
      if(!validateMember){
        return res.status(400).json({
          message: "Use a valid member"
        })
      }

      const task = await Task.create({
        title,
        description,
        dueDate,
        status,
        assignedTo,
        owner,
        workspace
      })
       return res.status(201).json({
        message: "Task created successfully",
        task: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        workspace: task.workspace
       })

  } catch(err){
    return res.status(500).json({
      message: `Internal server error: ${err}`
    })
  }

}

const getTask = async (req, res) => {
  try{
    const tasks = await Task.find({workspace : req.user.currentWorkspace})
    return res.status(200).json({
      message: "Tasks gotten successfully",
      task : tasks
    })
  } 
  catch(err){
    return res.status(500).json({
      message: `Internal serer errror ${err}`
    })
  }
  
}

const updateTask = async (req, res) => {
  try{
    const { description, status, title, assignedTo } = req.body
    const task = await Task.findById(req.params.taskId)
    if(!task){
      return res.status(403).json({
        message : "Not a valid task"
      })
    }

    const owner = task.owner
    if(req.user._id.toString() !== owner.toString()){
      return res.status(403).json({
        message: "Only owners can update task"
      })
    }


    const fields = { title, description, status, assignedTo }
    const updates = {}

    for (const key in fields) {
      if (fields[key] !== undefined) {
        updates[key] = fields[key]
        if (key == "assignedTo"){
          const workspace = await Workspace.findById(task.workspace)
          const verify = await workspace.members.includes(assignedTo)
          if(!verify){
            return res.status(403).json({
              message : "They must be mebers of the workspace"
            })
          }
        }
      }
    }

    const updated = await Task.findByIdAndUpdate(task._id, updates, {new: true})
    return res.status(200).json({
      message: "Task updated successfully",
      task: updated
    })

  }catch(err){
    return res.status(500).json({
      message: `Internal server error ${err}`
    })
  }
  
}

const deleteTask = async (req, res) => {
  try{
    const task = await Task.findById(req.params.taskId)
    if(!task){
      return res.status(400).json({
        message: "Not a valid task"
      })
    }
    const owner = task.owner
    if(owner.toString() !== req.user._id.toString()){
      return res.status(403).json({
        message: "Only the owner fo a task can delete the task"
      })
    }

    const deletedTask = await Task.findByIdAndDelete(task._id)
    return res.status(200).json({
      message: "Task deleted successfully"
    })


  }catch(err){
    return res.status(500).json({
      message: `Internal server error ${err}`
    })
  }
}

export {
  createTask,
  getTask,
  updateTask,
  deleteTask
}