import express from "express";
import sequelize from "sequelize";
import formidable from "express-formidable";
import session from "express-session";
import Models from "./models";
import passport from "./passport";

import { render, logedIn } from "./util"

import appRouter from "./views/app/router"
import balanceRouter from "./views/balance/router"
import changePasswordRouter from "./views/change-password/router"
import contestEntryRouter from "./views/contest-entry/router"
import forgotPasswordRouter from "./views/forgot-password/router"
import loginRouter from "./views/login/router"
import myAccountRouter from "./views/my-account/router"
import myAccountEditRouter from "./views/my-account-edit/router"
import registerRouter from "./views/register/router"

//config express
const app = express();

app.use(express.static('public'));
app.use(formidable());
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
app.use('/change-password',changePasswordRouter)
app.use('/my-account',myAccountRouter)
app.use('/my-account-edit',myAccountEditRouter)

function server(){
	app.listen(process.env.PORT || 3000, () => {
	  console.log(`listening on 3000`)
	})
}

export default server