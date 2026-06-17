import { Workspace } from "../models/workspace.js";

const createWorkspace = async (req, res) => {
  try{
    const{name, members} = req.body
    if(!name){
      return res.status(400).json({
        message: "You need to put the required information"
      })
    }

    const verifyMembers = await (members) => {
      for(let i = 0; i >= members.length; i++){
        const existing =await members[i].findOne({_id: members[i]});
        if(!exiting){
          return res.staus(400).json({
            message: "You can only uuse registered users"
          })
        }
      }
    }

    if (!verifyMembers){
        return res.status(400).json({
          message : "use registered users"
        })
      }else{
        const workspace = await workspace.create({
          name,
          owner,
          workspace._id,
          members
        })
        return res.satus(200).json({
          mesage: "Workspace create succesfully"
        })
      }

  } catch(err){
    return res.status(500).json({
      message : `Internal server error ${err}`
    })
  }
}