var exports = module.exports = {};
var mysql=require('../db/utils');
const md5=require('md5');

exports.register=function(req,res,next)
{
  console.log(req.body);;
  var type=req.body.type;
  if(type=="patient")
  {
    mysql.insertpatient(req.body.phone,req.body.email,req.body.fullname,req.body.address,req.body.alert_emails,req.body.alert_mobiles,
    req.body.username,md5(req.body.password),function(err,result,data)
  {
   if(err)
    {
      console.log(err)
      res.status(401).json({
        status:false,
        message:result
      });
    }
    else{
      res.status(201).json({
        status:true,
        message:result,
        data:data
      })
    }
  })

    //(phone,email,fullname,address,alert_emails,alert_mobiles,username,password)

  }else if(type=="doctor")
  {
    //name,username,password,phone,email,address
    mysql.insertdoctor(req.body.name,req.body.username,req.body.password,req.body.phone,req.body.email,req.body.address,function(err,result,data)
  {
    if(err)
     {
       console.log(err)
       res.status(401).json({
         status:false,
         message:result
       });
     }
     else{
       res.status(201).json({
         status:true,
         message:result,
         data:data
       })
     }

  })


}else {
  res.status(401).json({
    status:false,
    message:"Enter a valid type doctor/patient"
  });
}
}

exports.login=function(req,res,next){
  var type=req.body.type;
  if(type=="patient")
  {

  }else if(type="doctor")
  {

  }else {
    res.status(401).json({
      status:true,
      message:"Please Enter a valid type"
    })
  }
}
