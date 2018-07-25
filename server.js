import express from "express";
import sequelize from "sequelize";
import session from "express-session";
import Models from "./models";
import passport from "./passport";

import { render, logedIn } from "./util"

import appRouter from "./views/app/router"
import loginRouter from "./views/login/router"
import registerRouter from "./views/register/router"
import contestEntryRouter from "./views/contest-entry/router"
import balanceRouter from "./views/balance/router"
import forgotPasswordRouter from "./views/forgot-password/router"

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

app.get('/logout',(req, res)=>{
	req.logOut();
	return res.redirect('/');
});

app.use('/',appRouter)
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.use('/contest-entry',contestEntryRouter)
app.use('/balance',balanceRouter)
app.use('/forgot-password',forgotPasswordRouter)

function server(){
	app.listen(process.env.PORT || 3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server