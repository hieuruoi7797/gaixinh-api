//TODO
//1. Import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//2. Create schema
var girlSchema = new Schema({
  name: String,
  image: String,
  yob: Number
});

//3. Create model
var GirlModel = mongoose.model('girl', girlSchema);


//4. Export
module.exports = GirlModel;
