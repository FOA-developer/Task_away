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

const addMember = async(req, res) => {
  try{
    const { userEmail } = req.body
    if (!userEmail){
      return res.status(400).json({
        message: "Use a valid email"
      })
    }
    const workspace = await Workspace.findById( req.user.currentWorkspace )
    const member = await User.findOne({ email : userEmail})
    if(!member){
      return res.status(403).json({
        message : "Must  be a register user"
      })
    }
    const alreadyAMember = workspace.members.includes(member._id)
    if(alreadyAMember){
      return res.status(403).json({
        message : "User is already in the workspace"
      })
    }

    const added = await Workspace.findByIdAndUpdate( workspace._id, { $push: { members: member._id } }, { new: true })
    return res.status(200).json({
      message: "Member added successfully",
      members : added.members
    })
  }
  catch(err){
    return res.status(500).json({
      message: `Internal server error ${err}`
    })
  }
  
}

export {
  createWorkspace,
  switchWorkspace,
  getWorkspace,
  addMember
}