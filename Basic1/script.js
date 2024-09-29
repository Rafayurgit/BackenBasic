const express = require("express");
const app = express();
const port =3000;


app.set("view engine", "ejs");

app.use(express.static("./public"))

app.use((req,res,next)=>{
    console.log(`${req.method} request for ${req.url}`);
    next();
});

app.get('/', function(req, res){
    res.render("index")
    
})



app.get('/profile', function(req,res){
    res.send("Hello from profile");
})

app.get('/contact', function(req, res){
    res.send("Hello from contact")
})

app.listen(port, ()=>{
    console.log(`App is listinig on ${port}`)
})