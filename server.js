// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let dateUrl = `https://snow-teal.glitch.me/`

app.get('/api/timestamp/(:date_string)?', (req, res) => {
    const dateString = req.params.date_string;

    // handle if the date_string is empty 
    if (!dateString) {
        const now = new Date().getTime() / 1000;

        res.send({
            unixstamp: Math.round(now),
            natural: moment.unix(now).format("MMMM DD, YYYY")
        });
    }

    // handle if the date_string matches 'YYYY-MM-DD' date format
    else if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const unix = moment(dateString).format('X');
        
        res.send({
            unixstamp: unix,
            natural: moment.unix(unix).format("MMMM DD, YYYY")
        });
    }

    // handle if the date_string is an unix timestamp 
    else if (dateString.match(/^\d+$/)) {
        const date = moment.unix(dateString).format("MMMM DD, YYYY");

        res.send({
            unixstamp: dateString,
            natural: date
        })
    }

    else {
        res.send({
            "unix": null, "utc" : "Invalid Date" 
        })
    }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});