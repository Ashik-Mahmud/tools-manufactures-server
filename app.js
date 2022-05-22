/* init server  */
const express = require('express');
const cors = require('cors');
require("dotenv").config();


const app = express();
const loginRouter = require("./Routes/login.route.js")
const teamRouter = require("./Routes/team.route.js")
// middleware 
app.use(cors());
app.use(express.json())



/* login  */
app.use("/login", loginRouter)

/* Getting Team Members */
app.use("/teams", teamRouter)


 /* testing api  */
app.get('/', (req, res) =>{
    res.send({success: true, message: "yeah successfully done to create first api"})
})

/* not found routes */
app.use((req, res, next) =>{
    res.status(404).send({success: false, message: "Not Found Route"})
})
/* Server Error Routes */
app.use((err, req,res, next) =>{
    res.status(500).send({success: false, message: "Something Broke of your API"})
})


module.exports = app;