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

export {
  createTask,
  getTask
}