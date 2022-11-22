/*************************************************************************
* BTI325– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic 
Policy. No part * of this assignment has been copied manually or electronically from any 
other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: _______Tatiana Kashcheeva_____________________ Student ID: ______148366206________ Date: ___18th October__2022__
*
* Your app’s URL (from Cyclic) : ___________ https://sparkling-hare-tunic.cyclic.app_________________________________
*
*************************************************************************/ 

var express = require("express"); 
const exphbs = require('express-handlebars');
var app = express();
var moduleA = require("./test2_moduleA");


var HTTP_PORT = process.env.PORT || 8080;  

app.engine('.hbs', exphbs.engine({ extname: '.hbs', default: "main"}));
app.set('view engine', '.hbs');

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}



app.get("/BSD", function(req, res){
    moduleA.getBSD().then(function(students)
    {
        
        res.render("students",{data:students})
    })
    .catch(function(err)
    {
        res.render("students",{message:"There are no BSD students"})
    })
    
});

app.get("/", function(req, res){
    /*let resText = "<h2>Declaration</h2>";
    resText += `<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect<br>
    whether my work is done remotely or onsite. Any test or assignment is an act of trust between<br>
    me and my instructor and especially with my classmates... even when no one is whatching. I<br>
    declare I will not break this trust.</p>`; 
    resText += "Name: <mark>Tatiana Kashcheeva</mark><br>"
    resText += "Student Number: <mark>148366206</mark><br>"
    resText += "<br><a href = '/BSD'> Click to visit BSD students </a> <br>";
    resText += "<br><a href = '/highGPA'> Click to see who has the highest GPA </a> <br>";
    res.send(resText);*/
    res.render("home",{})
});

app.get("/allStudents", function(req, res){
    moduleA.allStudents().then(function(st)
    {
       res.render("students",{data:st})
    })
    .catch(function(err)
    {
        console.log(err)
    })
});

app.get("/highGPA", function(req, res){
    moduleA.highGPA().then(function(st)
    {
       res.render("student",{data:st})
    })
    .catch(function(err)
    {
        console.log(err)
    })
});


app.get('*',function(req,res)
{
    res.status(404).send("<h1>Error 404: page not found.</h1>");
})

moduleA.init().then(function()
{
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(function(msg)
{
    console.log(msg)
})

