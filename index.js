const app = require("./app");
// port 
const port = process.env.PORT || 5000;
/* Listen port of */
app.listen(port, ()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`);
})

