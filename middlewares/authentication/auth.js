const jwt = require('jsonwebtoken');
const User = require('../../model/userModel');


const checkJwt = async (req, res, next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "secretKey")
        const user = await User.findOne({token: token})
        if (user && user.name)
            return next();

        throw Error('No Auth')

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({
                message: "Token Expired"
            })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({
                message: "Invalid Token"
            })
        }

        return res.status(401).send({
            message: "Unauthorized Access"
        })

    }

}

module.exports = {checkJwt}