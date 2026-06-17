import { Task } from "../models/task.js"

const createTask = async (req, res) => {
  try{
    const{title, description, status, dueDate, workspace, assignedTo} = req.body;
      if(!title || !description || !status || !dueDate){
        return res.status(400).json({
          message: "All field are required"
        })
      }

      const owner = req.user;

      const task = await Task.create({
        title,
        description,
        dueDate,
        status,
        assignedTo,
        owner
      })
       return res.status(201).json({
        message: "Task created successfully"
       })

  } catch(err){
    return res.status(500).json({
      message: `Internal server error: ${err}`
    })
  }

}