import express from "express";
import { render } from "../../util";

const router = express.Router()

router.get('/',function (req, res) {
	return render(req,res,'app/landing')
})

router.get('/about',function (req, res) {
	return render(req,res,'app/about')
})

router.get('/contact',function (req, res) {
	return render(req,res,'app/contact')
})

router.get('/copyright',function (req, res) {
	return render(req,res,'app/copyright')
})

router.get('/rules_regulations',function (req, res) {
	return render(req,res,'app/rules_regulations')
})

router.get('/terms_conditions',function (req, res) {
	return render(req,res,'app/terms_conditions')
})

export default router