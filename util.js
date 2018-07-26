import numeral from "numeral";

export function logedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
    	if(req.xhr)
    		return res.send('not authorize')
        return res.redirect('/login');
    }
}

export function render(req,res,view, varibles = {}){
	let user = null
	if(req.user)
		user = {
			user_name: req.user.user_name,
			first_name: req.user.first_name,
			last_name: req.user.last_name, 
			email: req.user.email, 
			country: req.user.country,
			street_address: req.user.street_address,
			city: req.user.city,
			state: req.user.state,
			zip: req.user.zip,
			phone_number: req.user.phone_number,
			user_id_attachment_url: req.user.user_id_attachment_url,
			date_of_birth: req.user.date_of_birth,
			balance:req.user.balance,
			currency: req.user.currency
		}
	res.render(view,{ numeral:numeral, user:user, ...varibles });
}