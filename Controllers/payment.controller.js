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

module.exports = {createPaymentIntent}