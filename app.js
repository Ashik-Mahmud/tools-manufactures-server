/* init server  */
const express = require('express');
const cors = require('cors');
require("dotenv").config();


const app = express();
const loginRouter = require("./Routes/login.route.js")
const teamRouter = require("./Routes/team.route.js")
const userRouter = require("./Routes/users.route.js");
const adminRouter = require("./Routes/admin.route.js")
const reviewRouter = require("./Routes/review.route.js")
const productsRouter = require("./Routes/product.route.js");
const orderRouter = require("./Routes/order.route.js")
const paymentRouter = require("./Routes/payment.route.js")
// middleware 
app.use(cors());
app.use(express.json())



/* login  */
app.use("/login", loginRouter)

/* Getting Team Members */
app.use("/teams", teamRouter)

/* users  */
app.use("/users", userRouter)

/* check admin role*/
app.use("/admin", adminRouter)

/* review routes */
app.use("/reviews", reviewRouter)


/* products route */
app.use('/products', productsRouter)

/* Orders Route */
app.use('/orders', orderRouter)

/* payment route */
app.use('/payment', paymentRouter)



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