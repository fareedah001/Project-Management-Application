// require('dotenv').config({
//   path:'./server/.env'
// })
const express = require('express');
const colors = require('colors');



require('dotenv').config();
const connectDB = require('./config/db');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const port = process.env.PORT||2000;
const app = express();

// Connect to Database
connectDB();

app.use('/graphql', graphqlHTTP({
schema,
graphiql:
 true
// process.env.NODE_ENV === 'development'
}))
 app.listen(port, console.log(`Server running on port ${port}`));