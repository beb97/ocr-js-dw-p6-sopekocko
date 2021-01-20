const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');

exports.getUsers = async function () {
    try {
        const users = await User.find();
        return users;
    } catch (e) {
        throw Error('Error while getting users : '+e.message)
    }
}

exports.signup = async function (u) {
    try {
        const hash = await bcrypt.hash(u.password, 10)
        const user = new User({
            email: sanitize(u.email),
            password: hash
        });

        const newUser = user.save()
        return newUser;
    } catch (e) {
        throw Error('Error while signing up user : '+e.message)
    }
}

exports.login = async function (u) {
    try {
        const user = await User.findOne({email: u.email})
        if (!user) {
            throw Error('no user')
        } else {
            const valid = await bcrypt.compare(u.password, user.password);
            if (!valid) {
                throw Error('incorrect password')
            } else {
                const message = {
                    userId: user._id,
                    token:  jwt.sign(
                        { userId: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: '24h' }
                    )
                };
                return message;
            }
        }
    } catch (e) {
        throw Error('Error while loging user : '+e.message)
    }
}