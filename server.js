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
	if(req.user)
		res.redirect('/home')
	else
		render(req,res,'landing')
})

app.get('/login',(req,res)=>{
	if(req.user)
		res.redirect('/home')
	else
		render(req,res,'login')
})

app.post('/login',passport.authenticate('local',{ failureRedirect:'/login' }),(req,res)=>{
	res.redirect('/home')
})

app.get('/register',(req,res)=>{
	if(req.user)
		res.redirect('/home')
	else
		render(req,res,'register')
})

app.post('/register',(req,res)=>{
	Models.User.create({ 
		email: req.body.email, 
		password: req.body.password, 
		display_name: req.body.display_name
	}).then((user)=>{
		res.redirect('/login');
	}).catch((error)=>{
		res.status(400).send(error)
	})
})

app.get('/logout',(req, res)=>{
	req.logOut();
	res.redirect('/');
});

//app router secure
app.get("/home",loggedIn,(req,res)=>{
	render(req,res,'home')
})

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function render(req,res,view){
	res.render(view,{ user:req.user });
}

function server(){
	app.listen(3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server