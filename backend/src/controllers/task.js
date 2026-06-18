import { Task } from "../models/task.js";
import { Workspace } from "../models/workspace.js";

const createTask = async (req, res) => {
  try{
    const{title, description, status, dueDate, workspace, assignedTo} = req.body;
      if(!title || !description || !status || !dueDate){
        return res.status(400).json({
          message: "All field are required"
        })
      }

      const owner = req.user;
      const verifyWorkspace = await Workspace.findById(workspace);
      if(!verifyWorkspace){
        return res.status(404).json({
          message: "Workspace not found"
        })
      }

      const task = await Task.create({
        title,
        description,
        dueDate,
        status,
        assignedTo,
        owner,
        workspace: workspace
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

export {
  createTask
}