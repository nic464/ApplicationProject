const express = require('express')
const path = require('path')
const parse = require('csv-parse')
var fs = require('fs')

//initializes the express app
const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

function Row(amount, price, time){
	this.Amount = amount;
	this.Price = price;
	this.Time = time;
}

var Data = [];

var inputFile = "/data/BTCUSDData.csv";

var file; 
fs.watch(__dirname + inputFile, (eventType, filename) => {
	file = fs.readFileSync(__dirname + inputFile, "utf8");
	file = file.substring(file.indexOf("\n"));
	file = file.substring(file.indexOf("\n"));
	line = file.substring(file.substring(0, file.lastIndexOf("\n")).lastIndexOf("\n") + 1, file.lastIndexOf("\n"));
	//console.log(line);
	parse(line, function(err, output) {
		var tmp = output;
		if(tmp != undefined){
			Data.push(tmp);	
		}
	});	
});

//Makes an empty web page query go to the index.html file
//in the public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
  if (req.query.length == null) {
  	res.render('index', {
  		rows: Data,
  		listLength: 15
  	});	
  } else {
  	res.render('index', {
  		rows: Data,
  		listLength: req.query.length
  	});
  } 
})

app.get('/dataLoader', (req, res) => {
  res.render('dataLoader', {
  	rows: Data,
  	listLength: req.query.length
  });
})

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

//Hosts the server on specified port
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
