import express from "express";
import session from "express-session";
import path from "path";
import Models from "./models";
import passport from "./passport";

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
	res.redirect('/')
})

app.get('/register',(req,res)=>{
	if(req.user)
		return res.redirect('/')
	return render(req,res,'register')
})

app.post('/register',(req,res)=>{
	Models.User.create({ 
		email: req.body.email, 
		password: req.body.password, 
		display_name: req.body.display_name
	}).then((user)=>{
		console.log(user)
		return render(req,res,'register',{ success:true })
	}).catch((error)=>{
		return render(req,res,'register',{ error:error })
	})
})

app.get('/logout',(req, res)=>{
	req.logOut();
	res.redirect('/');
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
        res.redirect('/login');
    }
}

function render(req,res,view, varibles = {}){
	res.render(view,{ user:req.user, ...varibles });
}

function server(){
	app.listen(process.env.PORT || 3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server