import jwt from "jsonwebtoken";

const jwtAuthMiddleware=(req,res,next)=>{
    const token=req.header.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: error.message, message:"Unauthorized"})
    
    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoded;
        next();
    } catch (error) {
        console.error(error)
        res.status(401).json({error:error.message, message:"Invalid token"})
    }
}

export default jwtAuthMiddleware;