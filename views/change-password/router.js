import express from "express";
import bcrypt from "bcrypt";
import Models from "../../models";
import { render, logedIn } from "../../util";

const router = express.Router()

router.get('/',logedIn,function (req, res) {
	return render(req,res,'change-password/view')
})

router.post('/',logedIn,(req,res)=>{
	if(req.fields.new_password != req.fields.new_password_confirm)
		return render(req,res,'change-password/view')
	Models.User.findOne({
		where: { id: req.user.id }
	}).then((user)=>{
		if(user){
			bcrypt.compare(req.fields.password, user.password, function(err, resu) {
    			if(err || !resu)
    				return render(req,res,'change-password/view')
				user.changePassword(req.fields.new_password).then((new_user)=>{
					req.logOut();
				    return render(req,res,'change-password/success')
				}).catch((err)=>{ console.log(err) })		
			});
		}
	}).catch((error)=>{
		console.log(error)
		return render(req,res,'change-password/view')
	})
})

export default router