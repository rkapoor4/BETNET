import express from "express";
import Models from "../../models";
import countries from "../../public/countries";
import currencies from "../../public/currencies"
import { render } from "../../util";
import upload from "../../img-upload";

const router = express.Router()

router.get('/',(req,res)=>{
	if(req.user)
		return res.redirect('/')
	return render(req,res,'register/view',{ countries: countries, currencies: currencies })
})

router.post('/',(req,res)=>{
	if(!req.files)
		return render(req,res,'register/view',{ countries: countries, currencies: currencies })
	upload(req.files.file.path,function(result){
		Models.User.create({
			user_name: req.fields.user_name,
			first_name: req.fields.first_name,
			last_name: req.fields.last_name, 
			email: req.fields.email, 
			password: req.fields.password, 
			country: req.fields.country,
			street_address: req.fields.street_address,
			city: req.fields.city,
			state: req.fields.state,
			zip: req.fields.zip,
			phone_number: req.fields.phone_number,
			user_id_attachment_url: result.url,
			date_of_birth: req.fields.date_of_birth,
			balance:1000,
			currency: req.fields.currency
		}).then((user)=>{
			return res.redirect('/login');
		}).catch((error)=>{
			console.log(error)
			return render(req,res,'register/view',{ countries: countries, currencies: currencies })
		})
	})
	
})

export default router