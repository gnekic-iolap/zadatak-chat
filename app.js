var express = require ('express');
var bodyParser = require ('body-parser');
var path = require ('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'static')))

app.get('/', function(req, res){
	res.send('hi')

});

app.listen(5000,function(){
	
})

