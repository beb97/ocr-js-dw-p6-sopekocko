const uuid = require('uuid/v1');
const Camera = require('../models/Camera');

exports.getAllCameras = (req, res, next) => {

};

exports.login = (req, res, next) => {
      console.log(req);
      res.json({userId:"1",authToken:"1"});
      res.status(200);
      res.send('ok');
};

exports.signup = (req, res, next) => {
      console.log(req);
      res.status(200);
      res.send('ok');
};
