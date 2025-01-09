import jwt from "jsonwebtoken";

const generateJwt =(userData)=>{
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:"1h"});
}

const jwtAuthMiddleware=(req,res,next)=>{
    const authorization= req.headers.authorization;
    if(!authorization || authorization.startsWith("Bearer "))
         return res.status(401).json({error:"Token not Foun/Expire"});

    const token= authorization.split(" ")[1];

    try {
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(500).json({error:error.message, message:"Invalid token"})
    }
}

export {jwtAuthMiddleware, generateJwt};