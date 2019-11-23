
const mongoose =require('mongoose');
const Schema=mongoose.Schema;


const dataSchema=new Schema({

  date:Date,
  //HeartRate:Number,
  steps:Number,
  sleepingHours:Number,
  

  correspond :{
    type:Schema.Types.ObjectId,
    ref:'Patient'
  },



});


const data=mongoose.model('data',dataSchema);
module.exports=data;


