const nodemailer = require("nodemailer");

async function main() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailInfo = await transporter.sendMail({
    from: '"Daps mailer" dapoogunlana@gmail.com', 
    to: "butut1rogorogo@gmail.com", 
    subject: "Welcome", 
    text: "Welcome to property logger", 
    html: "<b>Welcome to property logger</b>"
  });
  transporter.sendMail(mailInfo, (error, info) =>{
    if(error){
      return console.log(error)
    }
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  })

}

module.exports = main