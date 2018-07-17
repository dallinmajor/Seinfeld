var express = require('express');
var mysql = require('mysql');
var app = express();

var PORT = process.env.PORT || 8080;


var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "",
    database: "seinfeld_db"
});


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/cast', function (req, res) {
    var query = "SELECT * FROM actors";
    html = "";

    connection.query(query, function (err, res) {
        if (err) throw (err);
        res.forEach(function (actor) {

            html4Actor = `<h1>${actor.name}</h1>
<h2>Coolness: ${actor.coolness_points}</h2>
<h2>Attitude: ${actor.attitude}</h2>
<h2>Cast Id: ${actor.id}</h2>
<br>
`
            html = html + html4Actor;
        })
        res.send(html);
    })


})

app.get('/coolness-chart', function (req, res) {
    var query = "SELECT * FROM actors ORDER BY coolness_points";
    var html = "";

    connection.query(query, function (err, res) {
        if (err) throw (err)
        res.forEach(function (actor) {
            var html4coolness = `<h1>${actor.name}</h1>
<h2>Coolness: ${actor.coolness_points}</h2>
<br>`
            html = html + html4coolness;
        })

        res.send(html);
    })
})

app.get('/attitude-chart/:att', function (req, res) {
    var attitude = req.params;

    var html = `<h1>${attitude}<h1>`;
    connection.query(`SELECT * FROM actors where attitude = ${attitude};`, function (err, res) {
        if (err) throw (err);

        res.forEach(function (actor) {
            var html4attitude = `<h2>Coolness: ${actor.coolness_points}</h2>
<h2>Attitude: ${actor.attitude}</h2>
<br>`;
            html = html + html4attitude;
        })

    })
})

app.listen(3000)