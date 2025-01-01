import jwt from "jsonwebtoken";

const jwtAuthMiddleware=(req,res,next)=>{
    const authorization= req.headers.authorization;
    if(!authorization) return res.status(401).json({error: "Token not Found/Expired"})

    const token=req.headers.authorization.split(' ')[1];
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

const generateJwt=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET, {expiresIn: 3000})
}

export {jwtAuthMiddleware, generateJwt};