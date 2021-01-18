exports.getHome = (req, res) => {
 res.send('zgeg');
};

exports.signup = (req, res) => {
    console.log(req);
    res.status(200);
    res.send('ok');
};
