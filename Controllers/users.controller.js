const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const userCollection = client.db("tools-manufactures").collection("users")
const updateProfile = async(req, res) =>{
    await client.connect();
    const data = req.body;
    const uid = req.query.uid;
    const decodedID = req.decoded.uid;
    const query = {uid: uid}
    const updateDoc = {
        $set: data
    }
    if(decodedID === uid){
        const result = await userCollection.updateOne(query, updateDoc);
        if(result.acknowledged){
            res.send({success:true, message: "Update profile successfully"})
        }
    }else{
        res.status(403).send({success:false, message: "Forbidden request"})
    }
    
}


const getProfileDetails = async (req, res) => {
    await client.connect();
    const decodedID = req.decoded.uid;
    const uid = req.query.uid;
        
    if(decodedID === uid){
        const result = await userCollection.findOne({uid: uid});
        res.send({success:true, result})
        
    }else{
        res.status(403).send({success:false, message: "Forbidden request"})
    }
}


const getAllUsers = async (req, res) => {
    await client.connect();
    const decodedID = req.decoded.uid;
    const uid = req.query.uid;
    if(decodedID === uid){
        const result = await userCollection.find({}).toArray();
        res.send({success:true, result})
    }else{
        res.status(403).send({success:false, message: "Forbidden request"})
    }
}


const patchUserRole = async (req, res) => {
    await client.connect();
    const uid = req.query.uid;
    const decodedID = req.decoded.uid;
    const data = req.body;
    const query = {uid: uid}
    const updateDoc = {
        $set: data,
    }
    if(decodedID === uid){
        const result = await userCollection.updateOne(query, updateDoc);
        if(result.acknowledged){
            res.send({success: true, message: "Made admin successfully done."})
        }
    }else{
        res.status(403).send({success:false, message: "Forbidden request"})
    }    
}


module.exports = {updateProfile, getProfileDetails, getAllUsers, patchUserRole}