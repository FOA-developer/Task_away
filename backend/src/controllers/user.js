import { User } from "../models/user.js";
import jwt from "jsonwebtoken"

const registerUser = async (req , res) => {
  try{
    const{name, email, password, confirmPassword} = req.body;
    if(!name || !email || !password || !confirmPassword){
      return res.status(400).json({
        message: "All fields must be filled"
      })
    }

    if(password !== confirmPassword){
      return res.status(400).json({
        message: "Passwords do not match"
      })
    }

    const existing = await User.findOne({email: email.toLowerCase()});
    if(existing){
      return res.status(403).json({
        message: "user already exists"
      })
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    })
    return res.status(201).json({
      message: "User created successfully",
      id: user._id,
      name : user.name,
      email: user.email
    })
  }
  catch(err){
    return res.status(500).json({
      message: "Error creating user",
      error: err.message
    })
  }
}

const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;
     if(!password || !email){
      return res.status(400).json({
        message: "All fields must be filled"
      })
     }

     const existing = await User.findOne({email: email.toLowerCase()});
     if(!existing){
      return res.status(403).json({
        messsage: "User dosen't exist...sign up"
      })
     }

     const isMatch = await existing.comparePasswords(password);
     if(!isMatch){
      return res.status(403).json({
        message: "Invalid credentials"
      })
     }else{
        const token = jwt.sign(
          {id: existing._id},
          process.env.JWT_SECRET,
          { expiresIn: "4d"}
        )
       return res.status(200).json({
        message: "login Successful",
        token
       })
     }
  }catch(err){
    return res.status(500).json({
      message: "Error logging in",
      error: err.message
    })
  }
}

export {
  registerUser,
  loginUser
}