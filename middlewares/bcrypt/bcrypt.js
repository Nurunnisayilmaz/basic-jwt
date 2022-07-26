const User = require('../../model/userModel');
const bcrypt = require("bcrypt");


const checkpassword = async (req, res, next) => {

    const body = req.body;

    const user = await User.findOne({ name: body.name });

    if (user) {

        const validPassword = await bcrypt.compare(body.password, user.password);

        if (validPassword) {
          return  next();
        }
    }
     return   res.status(401).json({ error: "User does not exist" });

}


module.exports = {checkpassword}














