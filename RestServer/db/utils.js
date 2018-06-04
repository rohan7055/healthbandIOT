var exports = module.exports = {};

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 100, //important
  host     : 'localhost',
  user     : 'root',
  password : 'abc12345',
  database : 'healthband'
});

insertpatient=function(phone,email,fullname,address,alert_emails,alert_mobiles,username,password,doctor_id,callback)
{
var query="insert patient (phone,email,fullname,address,alert_emails,alert_mobiles,username,password,doctor_id) values (?,?,?,?,?,?,?,?,?)";
queryArray=[phone,email,fullname,address,alert_emails,alert_mobiles,username,password,doctor_id];

pool.getConnection(function(error,connection){
  if(error){
    callback(true,null,"Pool Connection Error Occurred");
  }
  else{
    connection.query(query,queryArray,
                            function(error,result,fields){
                              connection.release();
                              if(error){
                                console.log(error);
                                callback(true,"Query Error Occured",null);
                              }
                              else{
                                callback(false,"Patient Registered Successfully",fields);
                              }
                            });
       }
});


}

insertdoctor=function(name,username,password,phone,email,address,callback)
{
  var query="insert doctor (name,username,password,phone,email,address) values (?,?,?,?,?,?)";
  var queryArray=[name,username,password,phone,email,address];

  pool.getConnection(function(error,connection){
    if(error){
      callback(true,null,"Pool Connection Error Occurred");
    }
    else{
      connection.query(query,queryArray,
                              function(error,result,fields){
                                connection.release();
                                if(error){
                                  console.log(error);
                                  callback(true,"Query Error Occured",null);
                                }
                                else{
                                  callback(false,"Doctor Registered Successfully",fields);
                                }
                              });
         }
  });
}

getPatient=function(username,callback)
{

var query="select * from patient where username=?";
var queryArray=[username];
pool.getConnection(function(err,connection)
{
 connection.query(query,queryArray,function(error,results,field)
{
 connection.release();

if(error)
{
  console.log(error);
  callback(true,null)
}
else {
      console.log(results);
      if(results.length>0)
      {
        callback(false,results);
      }
      else {
        callback(true,null);
      }
    }
});

})

}

getDoctor=function(username,callback)
{

var query="select * from doctor where username=?";
var queryArray=[username];
pool.getConnection(function(err,connection)
{
 connection.query(query,queryArray,function(error,results,field)
{
 connection.release();

if(error)
{
  console.log(error);
  callback(true,null)
}
else {
      console.log(results);
      if(results.length>0)
      {
        callback(false,results);
      }
      else {
        callback(true,null);
      }
    }
});

})

}


getDoctorByContact=function(contact,callback)
{

var query="select * from doctor where phone=?";
var queryArray=[contact];
pool.getConnection(function(err,connection)
{
 connection.query(query,queryArray,function(error,results,field)
{
 connection.release();

if(error)
{
  console.log(error);
  callback(true,null)
}
else {
      console.log(results);
      if(results.length>0)
      {
        callback(false,results);
      }
      else {
        callback(true,null);
      }
    }
});

})

}


getPatientInfo=function(username,callback)
{
  var query="select patient.*,doctor.name,doctor.phone,doctor.email from patient join doctor on patient.doctor_id=doctor.doctor_id where patient.username=?";
  var queryArray=[username];

  pool.getConnection(function(err,connection)
  {
   connection.query(query,queryArray,function(error,results,field)
  {
   connection.release();

  if(error)
  {
    console.log(error);
    callback(true,null)
  }
  else {
        console.log(results);
        if(results.length>0)
        {
          callback(false,results);
        }
        else {
          callback(true,null);
        }
      }
  });

});

}


getDoctorInfo=function(username,callback)
{
//  var query="select patient.*,doctor.name,doctor.phone,doctor.email from patient join doctor on patient.doctor_id=doctor.doctor_id where patient.username=?";

 var query="select doctor.*,patient.fullname,patient.phone,patient.address from doctor join patient on doctor.doctor_id=patient.doctor_id where doctor.username=?"
  var queryArray=[username];

  pool.getConnection(function(err,connection)
  {
   connection.query(query,queryArray,function(error,results,field)
  {
   connection.release();

  if(error)
  {
    console.log(error);
    callback(true,null)
  }
  else {
        console.log(results);
        if(results.length>0)
        {
          callback(false,results);
        }
        else {
          callback(true,null);
        }
      }
  });

});

}


exports.insertpatient = insertpatient;
exports.insertdoctor = insertdoctor;
exports.getPatient=getPatient;
exports.getDoctor=getDoctor;
exports.getDoctorByContact=getDoctorByContact;
exports.getPatientInfo=getPatientInfo;
exports.getDoctorInfo=getDoctorInfo;
