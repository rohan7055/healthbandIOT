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
