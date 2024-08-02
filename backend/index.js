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



async function startServer(){
    const app = express();
    connectDB()
    const server = new ApolloServer({
        typeDefs:mergedTypeDefs,
        resolvers:mergedResolvers
    })

    await server.start();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json())


    app.use('/graphql',expressMiddleware(server,{
        context:async({req})=> ({req})
    }));










    
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`)
    })

}

startServer();





