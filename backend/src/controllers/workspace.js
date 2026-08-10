import { User } from "../models/user.js";
import { Workspace } from "../models/workspace.js";

const createWorkspace = async (req, res) => {
  try{
    const{name} = req.body
    if(!name){
      return res.status(400).json({
        message: "You need to put the required information"
      })
    }
    const owner = req.user._id;
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

const switchWorkspace = async (req, res) => {
  try{
    const { newWorkspace } = req.body;
    const verifyWorkspace =await  Workspace.findById(newWorkspace)
     if (!verifyWorkspace){
      return res.status(403).json({
        message: "This workspace does not exist"
      })
     } 
    const validateMember = verifyWorkspace.members.includes(req.user._id);
    if (!validateMember){
     return res.status(403).json({
        message: "You don't belong to ths workspace"
      })
    }

    const changeWorkspace = await User.findByIdAndUpdate( req.user._id, { currentWorkspace: newWorkspace }, {new : true});
    return res.status(200).json({
      message: "workspace switched successfully",
      currentWorkspace: changeWorkspace.currentWorkspace
    })

  }catch(err){
    return res.status(500).json({
      message: `Internal server error ${err}`
    })
  }
}

const getWorkspace = async (req, res) => {
  try{
    const workspaces = await Workspace.find({members : req.user._id})
    return res.status(200).json({
      message: 'Workspace gotten successfully',
      workspace : workspaces
    })
  }
  catch(err){
    return res.status(500).json({
      message: "Internal server error"
    })
  }
}

export {
  createWorkspace,
  switchWorkspace,
  getWorkspace
}