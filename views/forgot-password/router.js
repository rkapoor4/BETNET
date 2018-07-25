import express from "express";
import randomstring from "randomstring";
import Models from "../../models";
import { render } from "../../util";
import sendMail from "../../mailer";

const router = express.Router()

router.get('/',function (req, res) {
	return render(req,res,'forgot-password/view')
})

router.post('/',(req,res)=>{
	Models.User.findOne({
		where: { email: req.body.email }
	}).then((user)=>{
		if(user){
			let new_password = randomstring.generate(8);
			user.changePassword(new_password).then((new_user)=>{
				var mailOptions = {
			        from: "Betnet ✔ <betnet@gmail.com>", // sender address
			        to: user.email, // list of receivers
			        subject: "New password ✔", // Subject line
			        text: new_password, // plaintext body
			    }
			    sendMail(mailOptions)
			    render(req,res,'forgot-password/success')
			}).catch((err)=>{ console.log(err) })
		}
	}).catch((error)=>{
		console.log(error)
		return render(req,res,'forgot-password/view')
	})
})

export default router