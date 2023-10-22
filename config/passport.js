const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const { BadRequest } = require("../errors");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_ClIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        //console.log(profile);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email:profile.emails[0].value
        };

        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            //throw new BadRequest("User already exist");

            done(null,user) //here it will insert user object into req object
          }else{
            user = await User.create(newUser);
            done(null,user) //here it will insert user object into req object
          }
          
        } catch (error) {
            throw new BadRequest("Something went wrong")
        }
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    done(null, await User.findById(id))
  });
};
