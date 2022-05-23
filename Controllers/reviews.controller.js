const client = require("../Connection/connection");
const reviewCollection = client.db("tools-manufactures").collection("reviews")

const addReviews = async (req,res) =>{
    await client.connect();
    const uid = req.query.uid;
    const decodedId = req.decoded.uid;
    const data = req.body;
    if(decodedId === uid){
        const result = await reviewCollection.insertOne(data);
        if(result.acknowledged){
            res.send({success: true, message: "Reviews added successfully done"})
        }
    }else{
        res.status(403).send({success:false, message: "Forbidden request"})
    }
}

module.exports = {addReviews}