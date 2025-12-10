require('dotenv').config({
  path:'./server/.env'
})
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const path = require("path");

require('dotenv').config();
const connectDB = require('./config/db');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const PORT = process.env.PORT||2000;
const app = express();

// Connect to Database
connectDB();
app.use(cors());
app.use('/graphql', graphqlHTTP({
schema,
graphiql:
 true
// process.env.NODE_ENV === 'development'
}))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

 app.listen(PORT, () => console.log(`Server running on port ${PORT}`));