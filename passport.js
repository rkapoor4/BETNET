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
			if(!user || user.password!=password)
				return done(null, false, { message: 'Incorrect user name or password.' });
			return done(null, user);
		}).catch((err)=>{
			return done(err);
		})
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
	Models.User.findOne({ where:{ id: id } }).then((user)=>{
		return done(null, user);
	}).catch((err)=>{
		return done(err);
	})
});

export default passport