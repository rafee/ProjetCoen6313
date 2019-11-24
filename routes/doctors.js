var express =require('express');
//var router = express.Router();
var mongoose = require('mongoose');
var Doctor =require('../models/Doctor');





const router =require('express-promise-router')();

const DoctorsController = require('../controllers/doctors');

router.route('/')
  .get(DoctorsController.index)
  .post(DoctorsController.newDoctor)
  .delete(DoctorsController.deleteDoctors);




router.route('/predictions/:patientId')
  .get(DoctorsController.getPredictions);
  
  
  
  router.route('/datas/:patientId')
  .get(DoctorsController.getPatientDataExternal);




router.route('/:DoctorId')
  .get(DoctorsController.getDoctor)
  .put(DoctorsController.replaceDoctor)
  .patch(DoctorsController.updateDoctor)
  .delete(DoctorsController.deleteDoctor);

router.route('/:DoctorId/patients')
  .get(DoctorsController.getDoctorPatients)
  .post(DoctorsController.newDoctorPatient);


router.route('/:DoctorId/patients/:patientId/data')
  .get(DoctorsController.getPatientData)
  .post(DoctorsController.newPatientData);
 


router.route('/:DoctorId/patients/:patientId')
  .get(DoctorsController.getDoctorPatient)
  .put(DoctorsController.updateDoctorPatients)
  .delete(DoctorsController.deleteDoctorPatients);



















  module.exports=router;

  
