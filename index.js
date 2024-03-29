const express = require('express')
const app = express()
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

var admin = require("firebase-admin");

var serviceAccount = require("./config/makaluServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


//load env variales
dotenv.config({
	path: './config/.env'
})
//require('./models/news/News.js')
require('./models/Adv.js')
//require('./models/Category.js')
//initialize port 
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//public path
app.use('/public',express.static('public'));

//Routes
const auth = require("./routes/auth");
const category = require("./routes/category");
const news = require("./routes/news/news.js");
const insight = require("./routes/news/insight.js");
const video = require("./routes/news/video");
const media = require("./routes/media")
const adv = require("./routes/adv");
//const upload = require("./routes/upload");
app.use('/api/v1/auth',auth);
app.use('/api/v1/category',category);
app.use('/api/v1/news',news);
app.use('/api/v1/insight',insight);
app.use('/api/v1/video',video);
app.use('/api/v1/media',media);
app.use('/api/v1/adv',adv);

//app.use('/api/v1/upload',upload);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, (req, res) => {
	console.log(
	 `Server is running in ${process.env.NODE_ENV} on the port ${port}`
	);
});