const jwt = require('jsonwebtoken');
const loginController= async(req, res) =>{
    const data = req.body;
    
    const token = jwt.sign(data, process.env.ACCESS_TOKEN, {
        expiresIn: '1d'
    })
    res.send({token})
}

module.exports ={loginController}