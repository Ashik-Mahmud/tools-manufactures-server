const client = require('./../Connection/connection.js');
const teamCollection = client.db("tools-manufactures").collection("teams");
const teamsController = async(req, res) =>{
    await client.connect();
    const result = await teamCollection.find({}).toArray();
    res.send({success: true, result})
};
module.exports = {teamsController}