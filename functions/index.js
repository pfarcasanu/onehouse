const functions = require('firebase-functions');
var nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.SendEmail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
      
    response.send("Hello from Firebase!");
    SendEmail();
  });
});


const SendEmail = () => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cs394onehouse2020@gmail.com',
      pass: '0neH0use2020'
    }
  });

  var mailOptions = {
    from: 'cs394onehouse2020@gmail.com',
    to: 'pfarcasanu@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
