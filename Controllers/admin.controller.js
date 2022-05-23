const client = require("../Connection/connection");

const userCollection = client.db("tools-manufactures").collection("users");
const isAdminController = async (req, res) => {
    const uid = req.query.uid;
    const decodedID = req.decoded.uid;
    if(decodedID === uid) {
        const userAccount = await userCollection.findOne({ uid: decodedID});
        const isAdmin = userAccount.role === "admin";
        res.send({isAdmin: isAdmin})
    }else{
        res.status(403).send({success: false, message: "Forbidden request"})
    }    
}

module.exports = {isAdminController}