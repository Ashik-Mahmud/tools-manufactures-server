
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
    auth: {
      api_key: process.env.EMAIL_API_KEY
    }
  }
const client = nodemailer.createTransport(sgTransport(options));
const SendEmail = async(data) => {
    const { email, date, time, treatment } = data;
    var emailFormat = {
        from: process.env.EMAIL_ADDRESS,
        to: email, 
        subject: `Your appointment is confirmed ${date} of ${time} for your ${treatment}`,
        text: `Your appointment is confirmed ${date} of ${time} for your ${treatment}`,
        html: `
        <div>
          <p>Hello ${email},</p>
          <p>Your appointment is confirmed already ${date} of ${time} for your ${treatment} </p>
          <p>Regards - <a href="https://doctors-portal-cf910.web.app/" target="_blank" >Doctors Para</a></p>
        </div>
        `,
      };
      client.sendMail(emailFormat, function(err, info){
        if (err ){
          console.log(error);
        }
        else {
          console.log('Message sent: ', info.response);
        }
    });
  

}

module.exports = SendEmail;