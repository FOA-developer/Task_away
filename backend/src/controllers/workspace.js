import { Workspace } from "../models/workspace.js";

const createWorkspace = async (req, res) => {
  try{
    const{name} = req.body
    if(!name){
      return res.status(400).json({
        message: "You need to put the required information"
      })
    }
    const owner = req.user;
      const workspace = await Workspace.create({
        name,
         owner,
        members : [owner]
      })
        return res.status(200).json({
          message: "Workspace created successfully",
          workspace: {
          id: workspace._id
          },
          members: workspace.members,
          owner: workspace.owner
        })

  } catch(err){
    return res.status(500).json({
      message : `Internal server error ${err}`
    })
  }
}

export {
  createWorkspace,
}