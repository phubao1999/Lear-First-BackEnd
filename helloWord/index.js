var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = [
    {id: 1, name: 'Bao'},
    {id: 2, name: 'Hien Luong'}
];

var port = 1000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
    res.render('index', {
        name: 'aaaa'
    });
})

app.get('/users', function(req, res){
    res.render('users/index', {
        users: users
    });
});

app.get('/users/search', function(req, res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
});

app.get('/users/create', function(req, res){
    res.render('users/create');
});

app.post('/users/create', function(req, res){
    users.push(req.body);
    res.redirect('/users');
})

app.listen(port, function(){
    console.log('Serve Is Listening On Port' + port);
})