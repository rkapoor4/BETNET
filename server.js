import express from "express";
import sequelize from "sequelize";
import session from "express-session";
import Models from "./models";
import passport from "./passport";

import { render, logedIn } from "./util"

import loginRouter from "./views/login/router"
import registerRouter from "./views/register/router"
import contestEntryRouter from "./views/contest-entry/router"
import balanceRouter from "./views/balance/router"

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

app.get('/logout',(req, res)=>{
	req.logOut();
	return res.redirect('/');
});

app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.use('/contest-entry',contestEntryRouter)
app.use('/balance',balanceRouter)

function server(){
	app.listen(process.env.PORT || 3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server