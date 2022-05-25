const client = require("../Connection/connection");
const blogCollection = client.db("tools-manufactures").collection("blogs");

const createBlog = async (req, res) => {
    await client.connect();
    const decodedID = req.decoded.uid;
    const data = req.body;
    const uid = data.author.uid;
        
    if(decodedID === uid) {
        const result = await blogCollection.insertOne(data);
        if(result.acknowledged){
            res.send({success: true, message:"Brand new blog created successfully done."})
        }
    }else{
        res.status(403).send({success: false, message: "Forbidden request"})
    }    
}

module.exports = {createBlog}