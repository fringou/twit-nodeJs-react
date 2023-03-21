// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/users/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // Recherchez l'utilisateur dans la base de données ou créez un nouvel utilisateur
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

// passport.use(new FacebookStrategy({
//     clientID: FACEBOOK_APP_ID,
//     clientSecret: FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/users/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // Recherchez l'utilisateur dans la base de données ou créez un nouvel utilisateur
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
