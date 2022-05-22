const jwt = require('jsonwebtoken');
const client = require('./../Connection/connection.js')
const userCollection = client.db("tools-manufactures").collection("users")
const loginController= async(req, res) =>{
    await client.connect();
    const data = req.body;
    const query = {email: data.email};
    const updateDoc = {
        $set: data
    }
    const options = {upsert: true}
    const result = await userCollection.updateOne(query, updateDoc, options)
    const token = jwt.sign(data, process.env.ACCESS_TOKEN, {
        expiresIn: '1d'
    })
    res.send({result, token})
}

module.exports ={loginController}