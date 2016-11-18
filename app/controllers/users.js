'use strict';

module.exports = function(model, utils) {

    var usersCtrl = {};

    usersCtrl.login = function(req, res, next) {
        console.log(req.body);

        model.findOne({ where: { email: req.body.email }})
            .then(function(user) {
                if (user) {
                    utils.compare(req.body.password, user.get().password, function(err, result) {
                        if (result)
                            res.status(200).json({
                                message: "login successful",
                                token: utils.tokenGen.sign(
                                    { email: req.body.email, 
                                      userId: user.get().id},
                                    utils.tokenKey,
                                    {expiresIn: "12h"}),
                                userId: user.get().id,
                                userName: user.get().nickName
                            });
                        else
                            res.status(401).json({message: "wrong password" });
                    })
                } else {
                    res.status(404).json({
                        message: "there is no user with this email"
                    });
                }
            }, function(err) {
                throw err
            });
    }


    usersCtrl.get = function(req, res, next) {
        if (req.user && req.user.role == "student") {
            model.findById(req.params.id)
                .then(function(user) {
                    if (user) res.json(user);
                    else res.status(404).json({ status: "404 stud not found" });
                }, function(err) {
                    res.status(1000).json({ status: "1000 failed, unknown error", message: err.message });
                    next(err);
                });
        } else {
            res.status(401).json({ status: "401 failed", message: "You do not have the right to access this resource" });
        }
    };

    usersCtrl.register = function(req, res, next) {
        model.findOne({ where: { email: req.body.stud_email } })
            .then(function(user) {
                if (user) {
                    res.status(409).json({ status: "409 failed", message: "user already exists" });
                    next();
                }

                utils.encrypt(req.body.stud_pass, function(encrypt) {
                    req.body.stud_pass = encrypt;
                    console.log("encrypted password: " + encrypt);
                    model.create(req.body)
                        .then(function(user) {
                            res.json(user);
                        }, function(err) {
                            console.log(JSON.stringify(err));
                            res.json({ status: "failed", message: err.message });

                        });
                })
            });
    };

    usersCtrl.upload = function(req, res, next){
        if(req.user == null) 
            res.status(401).json({message: "you are not logged in"});

        req.form.complete(function(err, field, files){
            if(err) throw err;
            else{
                res.status(200).json({message: "files uploaded to " + files.image.path});

                //
            }
        })
    }

    return usersCtrl;
}
