var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Girl = require('./models/girls');
//mongodb://<dbuser>:<dbpassword>@ds123725.mlab.com:23725/gaixinh
var app = express();
app.use(bodyParser.json());
//1.Connect
var mlabUri = "mongodb://admin:admin@ds123725.mlab.com:23725/gaixinh";
mongoose.connect(mlabUri, {useMongoClient: true});

// //2.Dump data
// var girl = new Girl({
//   name:"Trịnh Thị Thu Bích",
//   image: "https://scontent.fhan2-2.fna.fbcdn.net/v/t31.0-1/c0.408.960.960/p960x960/22467494_783745865143082_6281494702400794794_o.jpg?oh=2347db5c039b0d5ff9c81a0557bed9f9&oe=5A75CEF4",
//   yob: 1995
// });
//
// girl.save();

//3.Use in GET /girls

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/api', function(request, response){
  response.json({hello: 'world'  });
});


app.get('/api/girls',function(req,res){
  Girl.find(
    {},
    function (err,girls) {
      if (err) {
        res.json({success: 0, data: null});
      }
      else {
        res.json({success: 1, data: girls});
      }
    }
  )
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/api/girls', function(req,res){
  var body = req.body;
  var name = body.name;
  var image = body.image;
  var yob = body.yob;
  var girl = new Girl({
    name,
    image,
    yob
  });
  girl.save(function(err, savedGirl){
    if(err){
      res.json({
        success: 0,
        data: null,
        message: "Error in save: "+ err
      });
    }else{
      res.json({success: 1, data: savedGirl});
    }
  });
  res.json({success: 1 , data: req.body});
});
