const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const methodOverride =  require('method-override')
const passport = require("passport")
const mainRouter = require("./routes/mainRouter")
const userRouter = require("./routes/userRouter")
const productsRouter = require("./routes/productsRouter")

app.listen(process.env.PORT || 3006,()=>{console.log("Servidor corriendo en: localhost:3006/")});

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
const cookies = require('cookie-parser');
app.use(cookies());
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: "Shhh, secreto",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

app.use('/', mainRouter)
app.use("/", userRouter)
app.use('/productos', productsRouter)