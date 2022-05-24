const { ObjectId } = require("mongodb");
const client = require("../Connection/connection");
const { sendOrderEmail, paymentConfirmationEmail } = require("../SendEmail/SendEmail");
const orderCollection = client.db("tools-manufactures").collection("orders")

const saveOrderData = async(req, res) => {
    await client.connect();
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(decodedID === userId){
        const orderData = req.body;
        const productName = req.body?.productInfo?.productName;
                      
        const isHas = await orderCollection.findOne({"productInfo.productName": productName, "author.uid": userId})
        if(isHas){
            return res.send({success: false, message: 'Already ordered this product.'})
        }
        const result = await orderCollection.insertOne(orderData);
        if(result.acknowledged){
            res.send({success: true, message: 'Order Placed successfully done. Check Your Email.'})
            sendOrderEmail(orderData)
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

const deleteOrderData = async(req, res) => {
    await client.connect();
    const userId = req.query.uid;
    const deleteId = req.query.deleteId;
    const decodedID = req.decoded.uid;
    if(userId === decodedID){
        const query = {_id: ObjectId(deleteId)}
        const result = await orderCollection.deleteOne(query)
        if(result.acknowledged){
            res.send({success: true, message:'Order canceled successfully done.'})
        }
    }else{
        res.status(403).send({success: false, message: 'forbidden request'})
    }
}
const paymentCollection = client.db("tools-manufactures").collection("payments")
const patchOrderData = async (req, res) => {
    await client.connect();
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(userId === decodedID){
        const query = {"author.uid": userId};
        const data = req.body;
        const updateDoc = {
            $set:{
                transactionId: data?.transactionId,
                paid: true
            }
        }
        const result = await orderCollection.updateOne(query, updateDoc)
        const savedResult = await paymentCollection.insertOne(data)
        if(result.acknowledged || savedResult.acknowledged){
            res.send({success: true, message: 'Payment acknowledged successfully & check your email'})
            paymentConfirmationEmail(data);
        }
    }else{
        res.status(403).send({success: false, message: 'forbidden request'})
    }
}


const getAllOrderData = async (req, res) => {
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(userId === decodedID){
        const result = await orderCollection.find({}).toArray();
        res.send({success: true, result})
    }else{
        res.status(403).send({success: false, message: 'forbidden request'})
    }
}




module.exports = {saveOrderData,getOrderData, deleteOrderData, patchOrderData, getAllOrderData}