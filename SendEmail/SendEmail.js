
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const options = {
    auth: {
      api_key: process.env.EMAIL_API_KEY
    }
  }
const client = nodemailer.createTransport(sgTransport(options));


const sendOrderEmail = async(data) => {
    const { productInfo, author, createdAt } = data;
       
    var emailFormat = {
        from: process.env.EMAIL_ADDRESS,
        to: author?.email, 
        subject: `Your order successfully placed name of your ${author?.name}`,
        text: `Your order successfully placed name of your ${author?.name}`,
        html: `
        <div style="padding:3rem;">
          <p>Hello ${author?.name},</p>
          <p>you order request we got now you should pay for confirmed your order. Your order summery. </p>
          <table style="padding:2rem; width:100%;border-collapse:collapse;">
          
            <tr>
                <td style="border: 1px solid #ccc; padding: 6px">Product Name</td>
                <th style="border: 1px solid #ccc; padding: 6px">${productInfo?.productName}</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 6px">Price</td>
                <th style="border: 1px solid #ccc; padding: 6px">${productInfo?.price}</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 6px">Order Quantity</td>
                <th style="border: 1px solid #ccc; padding: 6px">${productInfo?.orderQty}</th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 6px">Status</td>
                <th style="border: 1px solid #ccc; padding: 6px"><span style="color: tomato">Unpaid</span></th>
            </tr>
            <tr>
                <td style="border: 1px solid #ccc; padding: 6px">Placed Date</td>
                <th style="border: 1px solid #ccc; padding: 6px">${createdAt}</th>
            </tr>
          </table>
          <p>Regards - <a href="https://tools-manufactures.web.app" target="_blank" >Tools House</a></p>
        </div>
        `,
      };
      client.sendMail(emailFormat, function(err, info){
        if (err){
          console.log(err);
        }
        else {
          console.log('Message sent: ', info.response);
        }
    });
  

}

/*  Send Email for Payment Successfully done */
const paymentConfirmationEmail = async(data) =>{
    const { createdAt, transactionId, author,productInfo } = data;
    var emailFormat = {
        from: process.env.EMAIL_ADDRESS,
        to: author?.email, 
        subject: `Your Payment Confirmed for ${productInfo?.name} product at ${createdAt}  `,
        text: `Your Payment Confirmed for ${productInfo?.name} product  at ${createdAt}  `,
        html: `
        <div style="padding:3rem;">
          <strong>Hello ${author?.name},</strong>
          <h2>Congratulation!! Your payment confirmed This is your transactionID <strong>${transactionId}</strong></h2>
          <p>Your payment confirmed now you can't not refund of my application if you wanna refund you should direct call <strong>01757875757787</strong></p>
          
          <p>Regards - <a href="https://tools-manufactures.web.app" target="_blank" >Tools House</a></p>
        </div>
        `,
      };
      client.sendMail(emailFormat, function(err, info){
        if (err){
          console.log(err);
        }
        else {
          console.log('Message sent: ', info.response);
        }
    });
}

module.exports = {sendOrderEmail, paymentConfirmationEmail};