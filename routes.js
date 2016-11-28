module.exports = function(app, utils, models) {
    var ctrls = utils.loadControllers(models);

    //upload handling middleware:
    var multer  = require('multer');
    var upload = multer({ dest: 'uploads/' });


    app.get('/api/pictures', utils.checkToken);
    app.get('/api/pictures', ctrls['pictures'].userGetPictures);    

    app.post('/api/pictures', upload.single('picture'));
    app.post('/api/pictures', utils.checkToken); 
    app.post('/api/pictures', ctrls['pictures'].upload);

    // app.post('/api/users/upload', utils.checkToken);
    // app.post('/api/users/upload', ctrls['users'].upload);
    app.post('/api/users/login', ctrls['users'].login); // login
    app.post('/api/users/register', ctrls['users'].register);


    // catch-all
    app.get('*', function(req, res) { res.status(404).json({ error: 'Invalid GET request' }) })
    app.post('*', function(req, res) { res.status(404).json({ error: 'Invalid POST request' }) })
}
