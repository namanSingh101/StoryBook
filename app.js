const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const { engine } = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose= require("mongoose");
var methodOverride = require('method-override')

//to store session so that we will not be logged out
const MongoStore = require("connect-mongo")(session)

//db Connection
const dbConnection = require("./dbConnect/dbConnection");

//middleware
const notFoundRoute = require("./middleware/routeNotFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

//logging
const morgan = require("morgan");

//config
require("dotenv").config({ path: "./config/config.env" });
require("./config/passport")(passport);

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//body parser for form data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//for method override 
app.use(methodOverride('_method'))

//static
app.use(express.static(path.join(__dirname, "public")));

//date helper
const {formatDate,truncate,stripTags,editIcon,select} = require("./helpers/hbs")

//handlerbars
app.engine(".hbs", engine({helpers: {formatDate,truncate,stripTags,editIcon,select}, defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//express session
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection})
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//routes
const authRouter = require("./routes/auth");
const storyRouter = require("./routes/stories")


app.use("/",require("./routes/index.js"))
app.use("/auth", authRouter);
app.use("/stories",storyRouter)

app.use(notFoundRoute);
app.use(errorHandlerMiddleware);

dbConnection()
  .then((result, error) => {
    if (error) {
      return;
    }
    console.log("DB Connection Successfull ");
    app.listen(process.env.PORT, () => {
      console.log(
       `App is listening on ${result.connection.host}`
      );
      
    });
  })
  .catch((error) => {
    console.log("Some error occured in DB connection " + error);
  });
