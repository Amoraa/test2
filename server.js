var express = require("express"); 

var app = express();
var moduleA = require("./test2_moduleA");

//var path = require("path"); 

var HTTP_PORT = process.env.PORT || 8080;  



function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}



app.get("/BSD", function(req, res){
    moduleA.getBSD().then(function(students)
    {
        
        res.json(students);
    })
    .catch(function(err)
    {
        res.json(err);
    })
});

app.get("/", function(req, res){
    let resText = "<h2>Declaration</h2>";
    resText += `<p>I acknowledge the College's academic integrity policy - and my own integrity - remain in effect<br>
    whether my work is done remotely or onsite. Any test or assignment is an act of trust between<br>
    me and my instructor and especially with my classmates... even when no one is whatching. I<br>
    declare I will not break this trust.</p>`; 
    resText += "Name: <mark>Tatiana Kashcheeva</mark><br>"
    resText += "Student Number: <mark>148366206</mark><br>"
    resText += "<br><a href = '/BSD'> Click to visit BSD students </a> <br>";
    resText += "<br><a href = '/highGPA'> Click to see who has the highest GPA </a> <br>";
    res.send(resText);
});

app.get("/highGPA", function(req, res){
    moduleA.highGPA().then(function(st)
    {
        let resText = "<h2>Highest GPA:</h2>";
    resText += "<p>Student ID: "+ st.studId+"</p>"; 
    resText += "<p>Name: "+st.name+"</p>";
    resText += "<p>Program: "+st.program+"</p>"
    resText += "<p>GPA: " +st.gpa+"</p>";
    
    res.send(resText);
    })
    .catch(function(err)
    {
        console.log(err)
    })
});


app.get('*',function(req,res)
{
    res.status(404).send("<h1 style='background-color: violet'>Error 404: page not found.</h1>");
})

moduleA.init().then(function()
{
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(function(msg)
{
    console.log(msg)
})

