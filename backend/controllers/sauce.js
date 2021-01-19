const Sauce = require('../models/Sauce');
const fs = require('fs');
var sanitize = require('mongo-sanitize');

exports.getAll = (req, res) => {
    console.log("sauce.getAll");
    Sauce.find()
        .then( sauces => res.status(200).json(sauces))
        .catch( error => res.status(400).json({error}));
};

exports.add = (req, res) => {
    console.log("sauce.add");
    const s =  JSON.parse(req.body.sauce);
    const image =  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

    // FOR MAPPING COULD USE triple point : "...s"
    const sauce = new Sauce({
        name: sanitize(s.name),
        manufacturer: sanitize(s.manufacturer),
        description: sanitize(s.description),
        mainPepper: sanitize(s.mainPepper),
        heat: sanitize(s.heat),
        description: sanitize(s.description),
        imageUrl: image,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []

    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce créé !'}))
        .catch(error => res.status(400).json({error}));

};

exports.getOne = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then( sauces => res.status(200).json(sauces))
        .catch( error => res.status(400).json({error}));
};

exports.update = (req, res) => {
    console.log("sauce.update");
    res.status(200).send();
};

exports.delete = (req, res) => {
    console.log("sauce.delete");
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.like = (req, res) => {
    console.log("sauce.like");
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Suppression des anciens like/dislike de l'user
            sauce.usersLiked = arrayRemove(sauce.usersLiked, req.body.userId);
            sauce.usersDisliked = arrayRemove(sauce.usersDisliked, req.body.userId);

            // Ajout du nouveau like/dislike de l'user
            if(req.body.like == 1) {
                sauce.usersLiked.push(req.body.userId);
            } else if(req.body.like == -1) {
                sauce.usersDisliked.push(req.body.userId);
            }

            // Maj des compteurs de like/dislike
            sauce.likes = sauce.usersLiked.length;
            sauce.dislikes = sauce.usersDisliked.length;

            sauce.save()
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Retourne une copie du tableau initial sans les valeurs "valueToRemove"
function arrayRemove(array, valueToRemove) {
    return array.filter(function(current) {
        return current != valueToRemove;
    })
}