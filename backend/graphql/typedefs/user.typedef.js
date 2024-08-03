const userTypeDef = `#graphql

type User{
     _id: ID!
    username: String!
	name: String!
	password: String!
	profilePicture: String
	gender: String
}

type Query{
   
    user(userId:ID!):User
    authUser:User
}

type Mutation{
    signUp(input:signUpInput!):User
    login(input:LoginInput!):User
    logout:logoutResponse
}


input signUpInput{
    username:String!
    name:String!
    password:String!
    gender:String!
  
}

input LoginInput{
    username:String!
    password:String!
}

type logoutResponse{
    message:String
}



`


export default userTypeDef;