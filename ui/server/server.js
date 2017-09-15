/* Minimal Node Server for development */
var express = require('express');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/api', (req, res) => {
    console.log('get request for route /api')
})

app.get('/api/:id', (req, res) => {
    console.log(req.params.id)
})

app.post('/api/authenticate', (req, res) => {
    console.log(req);
    res.send({ 'token': 'asdfsdf' });
})

app.post('/api/users', (req, res) => {
    console.log(JSON.stringify(req.body));
    console.log('req.body.username', req.body['username']);
    console.log('req.body.username', req.body['password']);
    console.log('req.body.username', req.body['firstName']);
    console.log('req.body.username', req.body['lastName']);
    res.send({
        'username': req.body['username'],
        'password': req.body['password'],
        'firstName': req.body['firstName'],
        'lastName': req.body['lastName']
    });
})


app.listen(3000, function() {
    console.log('Listening on PORT: 3000')
})