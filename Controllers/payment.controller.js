const client = require("../Connection/connection");
const paymentCollection = client.db('tools-manufactures').collection('payments')

const stripe = require('stripe')(process.env.SECRET_STRIPE_KEY);
const createPaymentIntent = async(req, res) =>{
    const data = req.body;
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(userId === decodedID){
        const price = Number(data.price) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: "usd",
            payment_method_types: ["card"],
        })
        res.send({clientSecret: paymentIntent.client_secret})
    }else{
        res.status(403).send({success: false, message: "Forbidden Request"})
    }  
}



const getPaymentHistory = async (req, res) => {
    await client.connect();
    const userId = req.query.uid;
    const decodedID = req.decoded.uid;
    if(userId === decodedID){
        const query = {"author.uid": userId}
        const result = await paymentCollection.find(query).toArray();
        res.send({success: true, data: result})
    }else{
        res.status(403).send({success: false, message: "forbidden Request"})
    }
}

module.exports = {createPaymentIntent, getPaymentHistory}