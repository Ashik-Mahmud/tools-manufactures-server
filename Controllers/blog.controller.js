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

const getBlogs = async (req, res) => {
    await client.connect();

    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(userId === decodedID) {
        const query = {"author.uid": userId};
        const result = await blogCollection.find(query).toArray();
        res.send({success:true, result})
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
}



module.exports = {createBlog, getBlogs}