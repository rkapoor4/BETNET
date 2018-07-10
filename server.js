import express from "express";
import Models from "./models";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

//config passport
passport.use(new LocalStrategy({
    	usernameField: 'email',
    	passwordField: 'password'
  	},
	function(username, password, done) {
		Models.User.findOne({ where:{ email: username } }).then((user)=>{
			if (user.password!=password) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		}).catch((err)=>{
			return done(err);
		})
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});
  
passport.deserializeUser(function(user, done) {
	done(null, user);
});

//config express
const app = express();

app.use(express.static('public'))
app.use(express.json());    
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res)=>{
	render(res,"home",false)
})

app.get('/login',(req,res)=>{
	render(res,"login",false)
})

app.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),(req,res)=>{
	render(res,"home",false)
})

app.get('/register',(req,res)=>{
	render(res,"register",false)
})

app.post('/register',(req,res)=>{
	Models.User.create({ 
		email: req.body.email, 
		password: req.body.password, 
		display_name: req.body.display_name
	}).then((user)=>{
		render(res,"home",true)
	}).catch((error)=>{
		res.status(400).send(error)
	})
})

function render(res,view,authenticated){
	let links = [
		{ link:"login", name:"Login" },
		{ link:"register", name:"Register" }
	]
	if(authenticated)
		links = [
			{ link:"account", name:"Acount" },
			{ link:"balance", name:"Balance" }
		]
	res.render(view,{
		links: links
	});
}

function server(){
	app.listen(3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server