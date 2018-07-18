import express from "express";
import session from "express-session";
import path from "path";
import Models from "./models";
import passport from "./passport";
import countries from "./public/countries"
//config express
const app = express();

app.use(express.static('public'))
app.use(express.json());    
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

//app router none secure
app.get("/",(req,res)=>{
	return render(req,res,'landing')
})

app.get("/about",(req,res)=>{
	return render(req,res,'about')
})

app.get("/contact",(req,res)=>{
	return render(req,res,'contact')
})

app.get("/copyright",(req,res)=>{
	return render(req,res,'about')
})

app.get("/rules_regulations",(req,res)=>{
	return render(req,res,'rules_regulations')
})

app.get("/terms_conditions",(req,res)=>{
	return render(req,res,'terms_conditions')
})

app.get("/contest-entry",(req,res)=>{
	return render(req,res,'contest-entry')
})

app.get('/login',(req,res)=>{
	if(req.user)
		return res.redirect('/')
	return render(req,res,'login')
})

app.post('/login',passport.authenticate('local',{ failureRedirect:'/login' }),(req,res)=>{
	return res.redirect('/')
})

app.get('/register',(req,res)=>{
	if(req.user)
		return res.redirect('/')
	return render(req,res,'register',{ countries: countries })
})

app.post('/register',(req,res)=>{
	Models.User.create({
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
		date_of_birth: req.body.date_of_birth
	}).then((user)=>{
		console.log(user)
		return res.redirect('/login');
	}).catch((error)=>{
		return render(req,res,'register',{ countries: countries, error:error })
	})
})

app.get('/logout',(req, res)=>{
	req.logOut();
	return res.redirect('/');
});

//app router secure
app.get("/account",loggedIn,(req,res)=>{
	return render(req,res,'account')
})

app.get("/balance",loggedIn,(req,res)=>{
	return render(req,res,'balance')
})

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.redirect('/login');
    }
}

function render(req,res,view, varibles = {}){
	let user = null
	if(req.user)
		user = {
			first_name: req.user.first_name,
			last_name: req.user.last_name, 
			email: req.user.email, 
			country: req.user.country,
			street_address: req.user.street_address,
			city: req.user.city,
			state: req.user.state,
			zip: req.user.zip,
			phone_number: req.user.phone_number,
			date_of_birth: req.user.date_of_birth,
			balance:req.user.balance
		}
	res.render(view,{ user:user, ...varibles });
}

function server(){
	app.listen(process.env.PORT || 3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server