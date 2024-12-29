import passport from "passport";
import { Person } from "./models/person.model.js";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new LocalStrategy (async(username, password ,done)=>{
    try {
        const user= await Person.findOne({username});
        if(!user){
            return done(null, false, {message: "Incorrect username"})
        }

        const isPasswordMatch=await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: "Password incorrect"})
        }
    } catch (error) {
        return done(error); 
    }
}))



export default passport;