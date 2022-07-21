const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const {name,password} = req.body;
    try {
        const data = await User({
            name,
            password
        })
        data.save();
        return res.status(200).json({status: 'success',data:data})
    } catch (e) {
        return res.status(404).json({code: 404, message: "Not Found", error: e})
    }
}

const login = async (req, res) => {
    const {name,password} = req.body;
    try {
        const data = await User.findOne();

        if(data===0){
            return res.status(404).json({message: "Not Found."});
        }

            const token = jwt.sign({

                name : name,
                id : data._id.toString()

            },'secretKey')

        return res.status(200).json({status: 'success'})
    } catch (e) {
        return res.status(404).json({code: 404, message: "Not Found", error: e})
    }
}


module.exports = {register,login};