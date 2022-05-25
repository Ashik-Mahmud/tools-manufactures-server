const { ObjectId } = require("mongodb");
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

const getAllBlogs = async (req, res) => {
    await client.connect();

    const query = {};
    const result = await blogCollection.find(query).toArray();
    res.send({success:true, result})
}


const updateBlog = async (req, res) => {
    await client.connect();

    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    const data = req.body;
    if(userId === decodedID) {
        const query = {"author.uid": userId};
        const updateDoc = {
            $set: data,
        };
        const result = await blogCollection.updateOne(query, updateDoc)
        if(result.acknowledged){
            res.send({success:true, message: "Updated blog successfully done."})
        }
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
    
}



const deleteBlog = async (req, res) => {
    await client.connect();

    const userId = req.query.uid;
    const deleteId = req.query.deletedId;
    const decodedID = req.decoded.uid;
    if(userId === decodedID) {
        const query = {_id: ObjectId(deleteId)}
        const result = await blogCollection.deleteOne(query);
            if(result.acknowledged){
                res.send({success: true, message:'Blog deleted successfully done.'})
            }
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
}



const getSearchBlog = async (req, res) => {
    await client.connect();
    const searchText = req.query.q.toLowerCase();
    const result = await blogCollection.find({}).toArray();
    const searchedResult = result.filter(blogs => blogs.title.toLowerCase().includes(searchText));
    res.send({success: true, result: searchedResult})
}

module.exports = {createBlog, getBlogs,getAllBlogs, updateBlog, deleteBlog, getSearchBlog}