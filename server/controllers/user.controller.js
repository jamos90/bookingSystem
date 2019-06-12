exports.auth = function(req,res){
}

exports.register = function(req, res){
    const userName = req.body.userName;
    const email =  req.body.email;
    const admin = req.body.admin
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    res.json({userName, email, admin});
}