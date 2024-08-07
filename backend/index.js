import express from 'express';
import {ApolloServer} from "@apollo/server"
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mergedTypeDefs from './graphql/typedefs/index.js';
import mergedResolvers from './graphql/resolvers/index.js';
dotenv.config({path:'backend/config/.env'})
const PORT = process.env.PORT || 8080;
import { connectDB } from './database/connectDB.js';
import passport from 'passport';
import session from 'express-session';
import connectMongo from "connect-mongodb-session"
import {buildContext} from 'graphql-passport';

import { configurePassport } from './passport/passport.js';

//passport.js configuration
configurePassport();



async function startServer(){
    const app = express();
    const MongoDBStore = new connectMongo(session)
    const store = new MongoDBStore({
        uri:process.env.MONGO_URI,
        Collection:"sessions"
    })

    store.on("error",(error)=>{
        console.log(error)
    })

    app.use(
        session({
            secret:process.env.SESSION_SECRET,
            resave:false,
            saveUninitialized:false,
          
            cookie:{
                maxAge:1000*60*60*24*7,
                httpOnly:true
            },
            store:store
        })
    )

    app.use(passport.initialize());
    app.use(passport.session());


    connectDB()
    const server = new ApolloServer({
        typeDefs:mergedTypeDefs,
        resolvers:mergedResolvers
    })

    await server.start();

    app.use("/graphql",cors({
        origin:"http://localhost:3000",
        credentials:true
    }));
    app.use(bodyParser.json());
    app.use(express.json())


    app.use('/graphql',expressMiddleware(server,{
        context:async({req,res})=> buildContext({req,res})
    }));










    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })

}

startServer();





