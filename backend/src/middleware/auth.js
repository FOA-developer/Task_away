import jwt from "jsonwebtoken"

const verifyToken = async(req, res, next) => {
  try{
    const authToken = req.headers.authorization
      if (!authToken){
        return res.status(401).json({
          message:"Unverified user"
        })
      } 

     const token = authToken.split(" ")

     const decoded = jwt.verify(token[1], process.env.JWT_SECRET)
     req.user = decoded.id
     next()
  } catch(err) {
     return res.status(500).json({
      message: "Internal server error", err
     })
  }
}

export default verifyToken;