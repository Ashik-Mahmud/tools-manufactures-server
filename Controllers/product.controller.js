const client = require("../Connection/connection");
const productCollection = client.db("tools-manufactures").collection("products")

const saveProductData = async (req,res) =>{
   await client.connect();
   const decodedID = req.decoded.uid;
   const uid = req.query.uid;
   const data = req.body;
   if(decodedID === uid){
       const result = await productCollection.insertOne(data);
       if(result.acknowledged){
           res.send({success: true, message:"Product created successfully"})
       }
   }else{
       res.status(403).send({success:false, message:"Forbidden request"})
   }
}

const getProductData = async (req, res) => {
    const uid = req.query.uid;
    const decodedID = req.decoded.uid;
    if(decodedID === uid){
        const result = await productCollection.find({}).toArray();
        res.send({success: true, result})
    }else{
        res.status(403).send({success: false, message:"forbidden request"})
    }
}

module.exports = {saveProductData, getProductData}