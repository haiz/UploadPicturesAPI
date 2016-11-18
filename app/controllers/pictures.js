'use strict';

module.exports = function(model, utils) {

    var picturesCtrl = {};

    picturesCtrl.upload = function(req, res, next){
        if(req.user == null) 
            res.status(401).json({message: "you are not logged in"});

        console.log("upload something");
        // req.form.complete(function(err, field, files){
        //     if(err) throw err;
        //     else{
        //         res.status(200).json({message: "image uploaded to " + files.image.path});
        //         var newImage = {link: files.image.path, userID: req.user.userID, caption: field.}
        //         model.create(req.)
        //     }
        // })
        var newImage = 
        	{link: req.file.path,
        	userID: req.user.userID,
        	caption: req.body.caption};

        model.create(newImage).then(
        	function(image){
        	res.status(200).json({message: "image uploaded to " + req.file.path});	
        },	function(error){
        	res.status(400).json({message: "errors occurred. Detail: " + error.message});	
        });
    }

    picturesCtrl.userGetPictures = function(req, res, next){
    	if(req.user == null) 
            res.status(401).json({message: "you are not logged in"});

        model.findAll({where: {userID: req.user.userID}})
        	.then(function(images){
        		if(images) res.json(images);
        		else res.status(404).json({message: "no course was found"});	
        	}, function(error){
        		res.status(500).json({message:"unknown error. Details: " + error.message});
        	})
    }

    return picturesCtrl;
}
