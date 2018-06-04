var helper = require('sendgrid').mail;
const async = require('async');

exports.email=function(req,res,next){

  async.parallel([
        function (callback) {
          sendEmail(
            callback,
            'admin-noreply@myrhband.tech',
            ['rohan.thakur7055@gmail.com', 'sp.sakshi1908@gmail.com'],
            'Remote Health Monitor Device Alert',
            'Patient is panick',
            '<p style="font-size: 32px;">This is the test alert message from Remote health monitoring system.</p>'
          );
        }
      ], function(err, results) {
        res.send({
          success: true,
          message: 'Emails sent',
          successfulEmails: results[0].successfulEmails,
          errorEmails: results[0].errorEmails,
        });
      });

}

exports.emailnew=function(req,res,next){

  const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'ron2prince@gmail.com',
  from: 'rohan.thakur7055@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);

}



function sendEmail(
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
  ) {
    const errorEmails = [];
    const successfulEmails = [];
     const sg = require('sendgrid')   ('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');
     async.parallel([
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, function (error, response) {
            console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });
        }
        // return
        callback(null, true);
      }
    ], function(err, results) {
      console.log('Done');
    });
    parentCallback(null,
      {
        successfulEmails: successfulEmails,
        errorEmails: errorEmails,
      }
    );
}
