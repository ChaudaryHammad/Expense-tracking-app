import { gql } from "@apollo/client";
export const SIGN_UP = gql`
mutation SignUp($input:signUpInput!){
    signUp(input:$input){
        _id
        name
        username
    }
}


`


export const LOGIN_USER = gql`
mutation Login($input:LoginInput!){
    login(input:$input){
       _id
        username
        name
    }
}

`


export const LOGOUT_USER = gql`

mutation logout{
    logout{
        message
    }
}


`