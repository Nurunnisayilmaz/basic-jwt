const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    const body = req.body;

    try {
        const user = new User(body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.save();

        return res.status(200).json({status: 'success', user: user})
    } catch (e) {
        return res.status(404).json({code: 404, message: "Not Found", error: e})
    }
}

const test = async (req, res) => {
    try {
        return res.status(200).json({status: 'success', message: "Jwt is Working"})
    } catch (e) {
        return res.status(404).json({code: 404, message: "Not Found", error: e})
    }
}



const login = async (req, res) => {
    const {name, password} = req.body;
    try {
        const data = await User.findOne({name: name});

        if (data === 0) {
            return res.status(404).json({message: "Not Found."});
        }

        const jwtExpirySeconds = 120

        const token = jwt.sign({
            name: name,
            id: data._id.toString()
        }, 'secretKey',{expiresIn: jwtExpirySeconds})

        // update data by id
        const updateData = await User.findOneAndUpdate({
            _id: data._id.toString()
        }, {
            $set:
                {
                    token: token
                }
        })

        return res.status(200).json({status: 'success', token: token})

    } catch (e) {

        return res.status(404).json({code: 404, message: "Not Found", error: e})

    }
}


module.exports = {register, login, test};