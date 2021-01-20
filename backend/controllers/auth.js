const authService = require('../services/auth');

exports.login = async function (req, res) {
    console.log("auth.login");
    const user =  req.body;

    try {
        const message = await authService.login(user)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.signup = async function (req, res) {
    console.log("auth.signup");
    const user =  req.body;

    try {
        const newUser = await authService.signup(user)
        return res.status(200).json(newUser)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};
