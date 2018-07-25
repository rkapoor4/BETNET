import nodemailer from 'nodemailer';

// create reusable transport method (opens pool of SMTP connections)
const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "buixuanquangvinh@gmail.com",
        pass: "quangvinh"
    }
});

export default function sendMail(mailOptions){

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
}