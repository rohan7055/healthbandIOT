var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_user: 'rohan8439',
    api_key: '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'
  }
}

var optionsdefault = {
  host: 'smtp.sendgrid.net',
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
           user: 'apikey', // generated ethereal user
           pass: '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' // generated ethereal password
       }
}

var optionsmyrhband = {
  host: 'smtp.myrhband.tech',
       port: 587,
       secure: false, // true for 465, false for other ports
       auth: {
           user: 'admin-noreply@myrhband.tech', // generated ethereal user
           pass: 'K*KLF*W1' // generated ethereal password
       }
}
var client = nodemailer.createTransport(optionsmyrhband);


var email = {
  from: 'admin-noreply@myrhband.tech',
  to: 'ron2prince@gmail.com',
  subject: 'Hello',
  text: 'Hello world',
  html: '<b>Hello world</b>'
};

client.sendMail(email, function(err, info){
    if (err ){
      console.log(err);
    }
    else {
      console.log('Message sent: ' + info.response);
    }
});
