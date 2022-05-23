const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const SendEmail = require("../SendEmail/SendEmail");
const orderCollection = client.db("tools-manufactures").collection("orders")

const saveOrderData = async(req, res) => {
    await client.connect();
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(decodedID === userId){
        const orderData = req.body;
        const productName = req.body.productName;
        const isHas = await orderCollection.findOne({productName: productName})
        if(isHas){
            return res.send({success: false, message: 'Already ordered this product.'})
        }
        const result = await orderCollection.insertOne(orderData);
        if(result.acknowledged){
            res.send({success: true, message: 'Order Placed successfully done. Check Your Email.'})
            SendEmail(orderData)
        }
    }else{
        res.status(403).send({success:false, message: 'Forbidden request'})
    }
    
}

const getOrderData = async(req, res) => {
    await client.connect();
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(userId === decodedID){
        const query = {"author.uid": userId};
        const result = await orderCollection.find(query).toArray();
        res.send({success: true, result})
    }else{
        res.status(403).send({success: false, message: 'forbidden request'})
    }
  
}

module.exports = {saveOrderData,getOrderData}