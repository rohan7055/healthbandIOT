const express = require('express');
const bodyParser=require('body-parser');
const md5=require('md5');

const EmailRoute=require('./controller/email');
const LoginRoutes=require('./controller/routes');




var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var router = express.Router();

router.get("/",function(req,res)
{
  res.json(
     {message:"Welcome to Health Band Api server"}
  );
});

router.get("/email",EmailRoute.email)
router.get("/emailnew",EmailRoute.emailnew)
router.post("/register",LoginRoutes.register)
router.post("/login",LoginRoutes.login)
router.post("/getPatientInfo",LoginRoutes.getPatientInfo)
router.post("/getDoctorInfo",LoginRoutes.getDoctorInfo)




//server.listen(process.env.PORT || 3000,'127.0.0.1');
app.use('/api/v1', router);
app.listen(4000, ()=> {
    console.log ("server running .....");
console.log("Visit localhost:4000");
});
