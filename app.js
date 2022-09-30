const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3031, ()=>{ 
    console.log("El servidor RED corriendo en: http://localhost:3031/");
});

app.get("/", (req,res) => {
    res.sendFile((path.join(__dirname, "./views/home.html")))
})

app.get("/login", (req,res) => {
    res.sendFile(path.join(__dirname, ("./views/login.html")))
})

app.get("/registro", (req,res) => {
    res.sendFile((path.join(__dirname,"./views/registro.html")))
})