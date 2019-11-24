const Doctor=require('../models/Doctor');
const Patient=require('../models/Patient');
const Data=require('../models/data');
const mongoose =require('mongoose');
const axios = require('axios')
const ObjectId = mongoose.Types.ObjectId;

module.exports ={


    index: async(req,res,next) => {
      const doctors = await Doctor.find({}).populate({path:'patients',populate: {path:'data'}}).exec();
    res.status(200).json(doctors);
  
},
getPredictions: async(req,res,next) => {


    const {patientId} =req.params;
    const patient=await Patient.findById(patientId);
	//console.log(patient['pregnant']);
	
	
	const patInfo=patient['on_thyroxine']+','+patient['query_on_thyroxine']+','+patient['on_antithyroid_medication']+','+patient['thyroid_surgery']+','+patient['query_hypothyroid']+','+patient['query_hyperthyroid']+','+patient['pregnant']+','+patient['sick']+','+patient['tumor']+','+patient['lithium']+','
	+patient['goitre']+','+patient['TSH_measured']+','+patient['T3_measured']+','+patient['TT4_measured']+','+patient['T4U_measured']+','+patient['FTI_measured']+','+patient['age']+','+patient['sex']+','+patient['TSH']+','+patient['T3']+','
	+patient['TT4']+','+patient['T4U']+','+patient['FTI'];
	//console.log(patInfo);
	const patiInfo='"'+patInfo+'"';
	
console.log(patiInfo);
//console.log('hello');
   axios.post('https://6tr8ub2tq1.execute-api.us-east-2.amazonaws.com/Test/predictthyroid', {
	"data":patInfo
})
.then((data) => {
	
	var label=data['data'];
	var predictions=label['predictions'];
	var predic=predictions[0];
	var predictedLabel=predic['predicted_label'];
  //console.log(`statusCode: ${res.data}`)
  	console.log(predic['predicted_label'])
	res.status(200).json(predictedLabel);

 
  
  
  
})
.catch((error) => {
  console.error(error)
})

  },

newDoctor: async(req,res,next) => {

    const newDoctor = new Doctor(req.body);
    res.status(201).json(newDoctor);
    const doctor= await newDoctor.save();
    
  
  },

  deleteDoctors: async(req,res,next) => {

    const result= await Doctor.deleteMany();
    res.status(200).json({success:true});
    
  
  },

  getDoctor: async (req,res,next) => {  

    const doctorId=req.params;
    const doctor=await Doctor.findById(doctorId.DoctorId).populate({path:'patients',populate: {path:'data'}}).exec();
    res.status(200).json(doctor);
  
  },
  
  replaceDoctor: async(req,res,next) => {
    const {doctorId}= req.params;
    const newDoctor=req.body;
    const result =await Doctor.findByIdAndUpdate(doctorId,newDoctor);
    res.status(200).json({success:true});
  },
  
  updateDoctor: async (req,res,next) => {
    const {doctorId}= req.params;
    const newDoctor=req.body;
    const result =await Doctor.findOneAndUpdate(doctorId,newDoctor);
    res.status(200).json({newDoctor});
  
  },
  
  deleteDoctor: async (req,res,next) => {
    const {doctorId}=req.params;
    const result= await Doctor.findOneAndRemove(doctorId);
    res.status(200).json({result});
  },


  getDoctorPatients: async (req,res,next) => {
    const {doctorId}=req.params;
    const doctor= await Doctor.findById(doctorId).populate({path:'patients',populate: {path:'data'}}).exec();
  
    res.status(200).json(doctor.patients);
  
  },

  getDoctorPatient: async (req,res,next) => {
    const {doctorId}= req.params;
    const {patientId} =req.params;
    const patient=await Patient.findById(patientId).populate('data');
    res.status(200).json(patient);

},
  
  newDoctorPatient: async(req,res,next) => {
    
    const doctorId=req.params.DoctorId;

    const newPatient=new Patient(req.body);

 
    const doctor= await Doctor.findById(doctorId);
  
    newPatient.consultBy=doctor;
  
    await newPatient.save();
  
    doctor.patients.push(newPatient);
   
    await doctor.save();
  
   res.status(201).json(newPatient._id);
  
  
  },


  getPatientData: async(req,res,next) => {
    const {patientId}=req.params;
	
	
  //  const {doctorId}=req.params;
    const patient= await Patient.findById(patientId).populate('data').select('data -_id').exec();
    res.status(200).json(patient);

},

  getPatientDataExternal: async(req,res,next) => {
    const {patientId}=req.params;
 axios.get('https://c7trbjve0a.execute-api.us-east-1.amazonaws.com/v1/datas/'+patientId)
.then((data) => {
	
//	var label=data['data'];
//	var predictions=label['predictions'];
//	var predic=predictions[0];
//	var predictedLabel=predic['predicted_label'];
  //console.log(`statusCode: ${res.data}`)
  console.log(data);
  	//console.log(predic['predicted_label'])
	res.status(200).json(data['data']);

 
  
  
  
})
.catch((error) => {
  console.error(error)
})

	
  //  const {doctorId}=req.params;
    
  //  res.status(200).json(patient);

},
  


newPatientData: async (req,res,next) => {

  const {patientId} =req.params;

 // const {DoctorId} =req.params;
 /* const lastData= await
Patient.aggregate(
[ { $match : { _id : ObjectId(patientId)} },
  { $unwind: "$data" },
 

  { $lookup: {from: 'data', localField: 'data', foreignField: '_id', as: 'result'} },

  {$unwind: "$result" },
  {$project: { "result.createdAt":1, "result.HeartRate":1, "result.Steps":1, "result.SleepingHours":1 }},

  {$group: {_id: "$_id",lastRegistered: { $last: "$result.HeartRate" } } }

]

);
*/
// res.status(201).json(lastMeasure[0].lastRegistered);

  const newData=new Data(req.body);

 // newData.set("createdAt",Date.now());

  //newData.value=newData.value.toFixed(2);

  //if(lastData[0].lastRegistered==null){
    const patient = await
    Patient.findById(patientId);

    newData.correspond = patient;

    await
    newData.save();

    

    patient.data.push(newData);

    await
    patient.save();

    res.status(200).json(newData);

    /*if(newData.HeartRate>100){

      var d = new Date();
      console.log("High heart Rate");




    }*/

    
    },
    deleteDoctorPatients : async (req,res,next) => {

        const {patientId}= req.params;
      // const {doctorId}=req.params;
      const result= await Patient.findOneAndDelete({"_id":patientId});
      res.status(200).json(result);
  
  },
  updateDoctorPatients: async (req,res,next) => {
    const {patientId}= req.params;
    
    const newPatient=req.body;
    const result =await Patient.findOneAndUpdate({"_id":patientId},newPatient);
    res.status(200).json(newPatient);
  }
       
  }

  
