import jwt from "jsonwebtoken"
import { User } from "../models/user.js"

const verifyToken = async(req, res, next) => {
  try{
    console.log("Middleware reached")
    const authToken = req.headers.authorization
      if (!authToken){
        return res.status(401).json({
          message:"Unverified user"
        })
      } 

     const token = authToken.split(" ")

     const decoded = jwt.verify(token[1], process.env.JWT_SECRET)
     req.user = await User.findById(decoded.id)

     if (!req.user) {
      return res.status(401).json({ message: "User not found" })
    }
    
     next()
  } catch(err) {
     return res.status(500).json({
      message: "Internal server error", err
     })
  }
}

export default verifyToken;