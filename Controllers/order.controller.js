const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const SendEmail = require("../SendEmail/SendEmail");
const orderCollection = client.db("tools-manufactures").collection("orders")

const saveOrderData = async(req, res) => {
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(decodedID === userId){
        const orderData = req.body;
        const result = await orderCollection.insertOne(orderData);
        if(result.acknowledged){
            res.send({success: true, message: 'Order Placed successfully done. Check Your Email.'})
            SendEmail(orderData)
        }
    }else{
        res.status(403).send({success:false, message: 'Forbidden request'})
    }
    
}

module.exports = {saveOrderData}