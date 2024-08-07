import bcrypt from "bcryptjs";

import User from "../../models/user.model.js";

const userResolver = {
    Query:{

        authUser:async(_,__,context)=>{
            try {
                const user = await context.getUser();
                return user
                
            } catch (error) {
                console.log(`Error in authUser query: ${error.message}`);
                throw new Error(error.message || "Internal server error");
            }

        },
        
        user:async(_,{userId})=>{
          try {
            const user = await User.findById(userId);
            return user;
          } catch (error) {
            console.log(`Error in user query: ${error.message}`);
            throw new Error(error.message || "Internal server error");
          }
        }


    },


    Mutation:{
        signUp:async(_,{input},context)=>{
           try {

            const {username,name,password,gender} = input;

            if(!username || !name ||!password || !gender){
                throw new Error('All fields are required')
            }

            const exsistingUser = await User.findOne({username})
            if(exsistingUser){
                throw new Error('User already exists')
            }

            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password,salt)

            const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
            const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`
            const newUser = new User({
                username,
                name,
                password:hashPassword,
                gender,
                profilePicture: gender === "male" ? boyProfilePicture : girlProfilePicture

            })

            await newUser.save();
            await context.login(newUser)
            return newUser;
           } catch (error) {
                console.log(`Error in signUp mutation: ${error.message}`);
                throw new Error(error.message || "Internal server error");
            
           }

        },


        login:async(_,{input},context)=>{
            try {
                const {username,password}= input;
                if(!username || !password){
                    throw new Error('All fields are required')
                }
                const {user} = await context.authenticate('graphql-local',{username,password})
                await context.login(user)
                return user;

            } catch (error) {
                console.log(`Error in login mutation: ${error.message}`);
                throw new Error(error.message || "Internal server error");
            }
        },


        logout:async(_,__,context)=>{
            try {
                await context.logout();
                context.req.session.destroy((err)=>{
                    if(err){
                        throw new Error('Error in logout')
                    }
                })

                context.res.clearCookie("connect.sid")
                return {message:"Logged out successfully"}
               
                
            } catch (err) {
                console.log(`Error in logout mutation: ${error.message}`);
                throw new Error(err.message || "Internal server error");
            }
        }
    }

}


export default userResolver;