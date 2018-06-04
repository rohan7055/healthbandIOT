var exports = module.exports = {};
var mysql=require('../db/utils');
const md5=require('md5');
const jwt=require('jsonwebtoken');
var secretKey="myrhband.tech"

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

    mysql.getPatient(req.body.username,function(err,result)
    {
      if(err)
      {
        console.log(err)
        res.status(401).json({
          status:false,
          message:"Auth Failed Try Again"
        });
      }
      else {

        if(result[0].password==md5(req.body.password))
        {
          const token=jwt.sign(
            {
              phone:result[0].phone,
              username:result[0].username
            },
            secretKey,
            {
              expiresIn:"3h"
            });
           //token aquired send jwt token
            res.status(200).json(
              {
                status:true,
                message:"Successfully Logged In",
                data:result[0],
                session:token
              }
            )
        }
        else {
          //email and password doesnt match
          res.status(401).json({
            status:false,
            message:"Auth Failed Try Again"
          });

        }



      }
    });

  }else if(type="doctor")
  {
    mysql.getDoctor(req.body.username,function(err,result)
    {
      if(err)
      {
        console.log(err)
        res.status(401).json({
          status:false,
          message:"Auth Failed Try Again"
        });
      }
      else {

        if(result[0].password==md5(req.body.password))
        {
          const token=jwt.sign(
            {
              phone:result[0].phone,
              username:result[0].username
            },
            secretKey,
            {
              expiresIn:"3h"
            });
           //token aquired send jwt token
            res.status(200).json(
              {
                status:true,
                message:"Successfully Logged In",
                data:result[0],
                session:token
              }
            )
        }
        else {
          //email and password doesnt match
          res.status(401).json({
            status:false,
            message:"Auth Failed Try Again"
          });

        }



      }
    });

  }else {
    res.status(401).json({
      status:true,
      message:"Please Enter a valid type"
    })
  }
}
