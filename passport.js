import Models from "./models";
import passport from "passport";

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