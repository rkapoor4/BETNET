import express from "express";
import Models from "../../models";
import countries from "../../public/countries";
import currencies from "../../public/currencies"
import { render } from "../../util";

const router = express.Router()

router.get('/',(req,res)=>{
	if(req.user)
		return res.redirect('/')
	return render(req,res,'register/view',{ countries: countries, currencies: currencies })
})

router.post('/',(req,res)=>{
	Models.User.create({
		user_name: req.body.user_name,
		first_name: req.body.first_name,
		last_name: req.body.last_name, 
		email: req.body.email, 
		password: req.body.password, 
		country: req.body.country,
		street_address: req.body.street_address,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		phone_number: req.body.phone_number,
		date_of_birth: req.body.date_of_birth,
		balance:1000,
		currency: req.body.currency
	}).then((user)=>{
		return res.redirect('/login');
	}).catch((error)=>{
		console.log(error)
		return render(req,res,'register/view',{ countries: countries, currencies: currencies })
	})
})

export default router