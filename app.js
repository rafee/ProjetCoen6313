const express=require('express');
var path = require('path');
const app=express();
const mongoose=require('mongoose');
var bodyParser = require('body-parser');
var  fs = require('fs'),
 f = require('util').format;
var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

var doctors = require('./routes/doctors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.Promise=global.Promise;
//routes



//connect to db
mongoose.connect(
'mongodb://chamseddine:123456chams@cloud-concordia.cluster-cxfjdmvmj3tw.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0', 
{ 
  sslValidate: true,

  sslCA:ca,
  useNewUrlParser: true,
useUnifiedTopology:true
}).then(() =>  console.log('connection successful'))
.catch((err) => console.error(err));
app.use(bodyParser.urlencoded({'extended':'false'}));
//app.use(express.static(path.join(__dirname, 'dist')));
//app.use('/doctors', express.static(path.join(__dirname, 'dist')));
//app.use('/doctors',doctorsRoutes);
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/doctor', express.static(path.join(__dirname, 'dist')));
app.use('/doctors', doctors);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


