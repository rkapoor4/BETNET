import express from "express";
import bcrypt from "bcrypt";
import Models from "../../models";
import passport from "../../passport";
import { render, logedIn } from "../../util";

const router = express.Router()

router.get('/', function (req, res) {
  	if(req.user)
		return res.redirect('/')
	return render(req,res,'login/view')
})

router.post('/',(req,res)=>{
	Models.User.findOne({ where:{ email: req.fields.email } }).then((user)=>{
		if(!user)
			return res.redirect('/login');
		bcrypt.compare(req.fields.password, user.password, function(err, resu) {
			if(err || !resu)
				return res.redirect('/login');
			else
				req.login(user, function(err){
			        res.redirect('/');
			    });
		});
	}).catch((err)=>{
		return done(err);
	})
})

export default router