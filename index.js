const express = require('express')
const app = express()
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//load env variales
dotenv.config({
	path: './config/config.env'
})
require('./models/news/News.js')
//require('./models/Category.js')
//initialize port 
const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//Routes
const auth = require("./routes/auth");
app.use('/api/v1/auth',auth);

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, (req, res) => {
	console.log(
	 `Server is running in ${process.env.NODE_ENV} on the port ${port}`
	);
});