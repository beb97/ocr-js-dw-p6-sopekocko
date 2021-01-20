const jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const saucesService = require('../services/sauce');

exports.getAll = async function (req, res) {
    console.log("sauce.getAll");
    try {
        const sauces = await saucesService.getSauces()
        return res.status(200).json(sauces)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.add = async function (req, res) {
    console.log("sauce.add");
    const sauce =  JSON.parse(req.body.sauce);
    const image =  getImageUrl(req);
    const userId =  getTokenUserId(req);

    try {
        const sauce = await saucesService.add(sauce, image, userId)
        return res.status(200).json(sauce)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.getOne = async function (req, res) {
    console.log("sauce.getOne");
    const sauceId = req.params.id;

    try {
        const sauce = await saucesService.getOne(sauceId)
        return res.status(200).json(sauce)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.update = async function (req, res) {
    console.log("sauce.update");
    const userId =  getTokenUserId(req);
    const sauceId =  sanitize(req.params.id);
    const file = req.file;
    let sauce;
    let image;

    if(file) {
        sauce = JSON.parse(req.body.sauce);
        image =  getImageUrl(req);
    } else {
        sauce = req.body;
    }

    try {
        const newSauce = await saucesService.update(sauceId, sauce, image, userId)
        return res.status(200).json(newSauce)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.delete = async function (req, res) {
    console.log("sauce.delete");
    const sauceId = req.params.id;
    const userId = getTokenUserId(req);

    try {
        const message = await saucesService.delete(sauceId, userId)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

exports.like =  async function (req, res) {
    console.log("sauce.like");
    const sauceId = req.params.id;
    const likeValue = req.body.like;
    const userId = getTokenUserId(req);

    try {
        const sauce = await saucesService.like(sauceId, userId, likeValue)
        return res.status(200).json(sauce)
    } catch (error) {
        return res.status(400).json(error.message)
    }
};

// Retourne le userId du JWT
function getTokenUserId(req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userId;
}

// Retourne l'url complete de l'image
function getImageUrl(req) {
    return `${req.protocol}://${req.get('host')}/images/${sanitize(req.file.filename)}`;
}