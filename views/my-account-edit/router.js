import express from "express";
import Models from "../../models";
import countries from "../../public/countries";
import currencies from "../../public/currencies"
import { render, logedIn } from "../../util";
import upload from "../../img-upload";

const router = express.Router()

router.get('/',logedIn,function (req, res) {
	return render(req,res,'my-account-edit/view',{ countries: countries, currencies: currencies })
})

router.post('/',logedIn,(req,res)=>{
	if(!req.files)
		Models.User.update({
			user_name: req.fields.user_name,
			first_name: req.fields.first_name,
			last_name: req.fields.last_name,   
			country: req.fields.country,
			street_address: req.fields.street_address,
			city: req.fields.city,
			state: req.fields.state,
			zip: req.fields.zip,
			phone_number: req.fields.phone_number,
			date_of_birth: req.fields.date_of_birth,
			currency: req.fields.currency
		},{ where: { id: req.user.id } }).then((user)=>{
			req.login(user,(err)=>{
				return res.redirect('/my-account');
			})
		}).catch((error)=>{
			console.log(error)
			return render(req,res,'my-account-edit/view',{ countries: countries, currencies: currencies })
		})
	else
		upload(req.files.file.path,function(result){
			Models.User.update({
				user_name: req.fields.user_name,
				first_name: req.fields.first_name,
				last_name: req.fields.last_name,   
				country: req.fields.country,
				street_address: req.fields.street_address,
				city: req.fields.city,
				state: req.fields.state,
				zip: req.fields.zip,
				phone_number: req.fields.phone_number,
				user_id_attachment_url: result.url,
				date_of_birth: req.fields.date_of_birth,
				currency: req.fields.currency
			},{ where: { id: req.user.id } }).then((user)=>{
				req.login(user,(err)=>{
					return res.redirect('/my-account');
				})
			}).catch((error)=>{
				console.log(error)
				return render(req,res,'my-account-edit/view',{ countries: countries, currencies: currencies })
			})
		})
})

export default router