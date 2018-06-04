var exports = module.exports = {};

var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 100, //important
  host     : 'localhost',
  user     : 'root',
  password : 'abc12345',
  database : 'healthband'
});

insertpatient=function(phone,email,fullname,address,alert_emails,alert_mobiles,username,password,callback)
{
var query="insert patient (phone,email,fullname,address,alert_emails,alert_mobiles,username,password) values (?,?,?,?,?,?,?,?)";
queryArray=[phone,email,fullname,address,alert_emails,alert_mobiles,username,password];

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

exports.insertpatient = insertpatient;
exports.insertdoctor = insertdoctor;
exports.getPatient=getPatient;
exports.getDoctor=getDoctor;
