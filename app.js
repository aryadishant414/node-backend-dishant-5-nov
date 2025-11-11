var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var routes = require('./routes/route.js');
var cors = require('cors');
var morgan = require('morgan');

// enable CORS for frontend
app.use(cors());

// create log directory if not exists
const logDirectory = '/var/log/nodeapp';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// create write stream for log file
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'app.log'), { flags: 'a' });

// use morgan middleware for logging HTTP requests
app.use(morgan('[:date[iso]] :method :url :status - :response-time ms', { stream: accessLogStream }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', routes.home);

app.get('/api/customers', function (req, res) {
  const customers = [
    { id: 1, name: 'John Smith TEST', email: 'jsmith@test.com', phone: '123456789' },
    { id: 2, name: 'ABCDX', email: 'abcd@test.com', phone: '987654321' },
    { id: 3, name: 'Tyrion', email: 'tyrionXX@test.com', phone: '555666777' }
  ];
  res.json(customers);
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Catch the action at http://localhost:" + port);
});
