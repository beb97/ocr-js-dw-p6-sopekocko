const Sauce = require('../models/Sauce');
const sanitize = require('mongo-sanitize');

exports.getSauces = async function () {
    try {
        const sauces = await Sauce.find();
        return sauces;
    } catch (e) {
        throw Error('Error while getting sauces : '+e.message)
    }
}

exports.getOne = async function (sauceId) {
    try {
        const sauce = await Sauce.findById( sauceId );
        return sauce;
    } catch (e) {
        throw Error('Error while getting sauce : '+e.message)
    }
}

exports.delete = async function (sauceId, userId) {
    try {
        const sauce = await Sauce.findById( sauceId );
        if (!sauce) {
            throw Error('no sauce')
        } else if(sauce.userId !== userId ) {
            throw Error('not your sauce')
        } else {
            const filename = sauce.imageUrl.split('/images/')[1];
            await fs.unlink(`images/${filename}`, () => {});
            await Sauce.deleteOne({ _id: sauceId });
            return {message: 'Sauce supprimée  !'};
        }
    } catch (e) {
        throw Error('Error while deleting sauce : '+e.message)
    }
}

exports.like = async function (sauceId, userId, likeValue) {
    try {
        const sauce = await Sauce.findById( sauceId );
        if (!sauce) {
            throw Error('no sauce')
        } else {
            // Suppression des anciens like/dislike de l'user
            sauce.usersLiked = arrayRemove(sauce.usersLiked, userId);
            sauce.usersDisliked = arrayRemove(sauce.usersDisliked, userId);
            // Ajout du nouveau like/dislike de l'user
            if(likeValue === 1) {
                sauce.usersLiked.push( userId );
            } else if(likeValue === -1) {
                sauce.usersDisliked.push( userId );
            }
            // Maj des compteurs de like/dislike
            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;
            const newSauce = await Sauce.save();
            return newSauce;
        }
    } catch (e) {
        throw Error('Error while liking sauce : '+e.message)
    }
}

exports.add = async function (s, image, userId) {
    try {
        // FOR MAPPING COULD USE triple point : "...s"
        const sauce = new Sauce({
            name: sanitize(s.name),
            manufacturer: sanitize(s.manufacturer),
            description: sanitize(s.description),
            mainPepper: sanitize(s.mainPepper),
            heat: sanitize(s.heat),
            userId: sanitize(userId),
            imageUrl: image,
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });
        const newSauce = await sauce.save();
        return newSauce;
    } catch (e) {
        throw Error('Error while adding sauce : '+e)
    }
}

exports.update = async function (sauceId, s, image, userId) {
    try {
        // FOR MAPPING COULD USE triple point : "...s"
        const sauce = await Sauce.findById( sauceId );
        if (!sauce) {
            throw Error('no sauce')
        } else if(sauce.userId !== userId ) {
            throw Error('not your sauce')
        } else {
            if(s.name) sauce.name= sanitize(s.name);
            if(s.manufacturer) sauce.manufacturer= sanitize(s.manufacturer);
            if(s.description) sauce.description= sanitize(s.description);
            if(s.mainPepper) sauce.mainPepper= sanitize(s.mainPepper);
            if(s.heat) sauce.heat= sanitize(s.heat)
            if(image) sauce.imageUrl = image;

            const newSauce = await sauce.save();
            return newSauce;
        }
    } catch (e) {
        throw Error('Error while updating sauce : '+e)
    }
}

// Retourne une copie du tableau initial sans les valeurs "valueToRemove"
function arrayRemove(array, valueToRemove) {
    return array.filter(function(current) {
        return current !== valueToRemove;
    })
}