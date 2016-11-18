module.exports = function(app, utils, models) {
    var ctrls = utils.loadControllers(models);

    //upload handling middleware:
    var multer  = require('multer');
    var upload = multer({ dest: 'uploads/' });


    app.get('/api/users/getAllPictures', utils.checkToken);
    //app.get('/api/users/getAllPictures', ctrls['user'].);

    app.post('/api/pictures/upload', upload.single('picture') utils.checkToken);
    app.post('/api/pictures/upload', ctrls['pictures']);

    app.post('/api/users/upload', utils.checkToken);
    app.post('/api/users/upload', ctrls['users'].upload);
    app.post('/api/users/login', ctrls['users'].login); // login

    // catch-all
    app.get('*', function(req, res) { res.status(404).json({ error: 'Invalid GET request' }) })
    app.post('*', function(req, res) { res.status(404).json({ error: 'Invalid POST request' }) })
}
