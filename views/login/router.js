import express from "express";
import passport from "../../passport";
import { render, logedIn } from "../../util";

const router = express.Router()

router.get('/', function (req, res) {
  	if(req.user)
		return res.redirect('/')
	return render(req,res,'login/view')
})

router.post('/',passport.authenticate('local',{ failureRedirect:'/login' }),(req,res)=>{
	return res.redirect('/')
})

export default router