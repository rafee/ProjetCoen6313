const mongoose = require ('mongoose');

const Doctor=require('./Doctor');
const data=require('./data');
const PatientSchema = mongoose.Schema({

        Id : String,
        Name: String,
        Medecines : String,
        Conditions : String,
        PredictedDisease:String,
       /* Thyroid:{

        },*/
        

        data : [{

          type: mongoose.Schema.Types.ObjectId,
          ref: 'data'
           
        }],
        AddressP :{
          latitude:Number,
          longitude:Number
      },
        consultBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
          },

	on_thyroxine:Number,
	query_on_thyroxine :Number,
	on_antithyroid_medication :Number,
	thyroid_surgery:Number,
	query_hypothyroid:Number, 
	query_hyperthyroid:Number,
	pregnant:Number,
	sick:Number,
	tumor:Number,
	lithium:Number,
	goitre:Number,
	TSH_measured:Number,
	T3_measured:Number,
	TT4_measured:Number,
	T4U_measured:Number,
	FTI_measured:Number,
	age:Number,
	sex:Number,
	TSH:Number,
	T3:Number,
	TT4:Number,
	T4U:Number,
	FTI:Number



});  
module.exports=mongoose.model('Patient', PatientSchema);
