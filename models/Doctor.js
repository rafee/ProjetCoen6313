const mongoose = require ('mongoose');
const Patient=require('./Patient');
const DoctorSchema = mongoose.Schema({

        IdD : String,
        username:String,
        password:String,
        Name: String,
        Speciality : String,
        AddressD:{
          latitude:Number,
          longitude:Number
        
        },
        patients:[{
          
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
          
        }]

        
       
        

});

module.exports=mongoose.model('Doctor', DoctorSchema);


