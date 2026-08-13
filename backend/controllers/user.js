const userModel = require('../models/user.js');

exports.register = async (req, res) => {
    try {
        const { email, name, photoUrl } = req.body;
        const userExist = await userModel.findOne({ email: email });
        if (!userExist) {
            let user = new userModel({ name, email, photoUrl });
            await user.save();
            return res.status(200).json({
                message: 'User registered successfully',
                user: user
            });
        }
        return res.status(200).json({ message: 'Welcome Back' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}