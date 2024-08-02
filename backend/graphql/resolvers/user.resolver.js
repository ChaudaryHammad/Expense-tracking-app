import { users } from "../../dummyData/data.js";

const userResolver = {
    Query:{
        users:()=>{
            return users;
        },

        user:(_,{userId})=>{
           const userByID =  users.find((user)=>user._id==userId)
           return userByID;
        }


    },


    Mutation:{}

}


export default userResolver;