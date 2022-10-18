const fs = require("fs"); 
var students =[];


module.exports.init = function()
{
    return new Promise(function(resolve, reject)
    {
        
        fs.readFile('./students.json',(err,data)=>{
            if (err) 
            {
                reject("unable to read file")
            }
            
            students = JSON.parse(data)
            
            resolve("ok")
            })
            
    })
        

}
    
module.exports.getBSD=function()
{
    return new Promise(function(resolve, reject)
    {
        var bsd=[]
        var n=0
        for (let student of students)
        {
            if (student.program=="BSD")
            {
                bsd[n]=student;
                n++;
            }
        }
       if (bsd.length==0)
       {
        reject("no results returned")
       }
       else
       {
            resolve(bsd)
       }
            
    })
}
    
module.exports.highGPA=function()
{
    var gpa=0;
    var st=[];
    return new Promise(function(resolve,reject)
    {
        for (let student of students)
        {
            if (student.gpa>gpa)
            {
                st[0]=student;
                gpa=student.gpa;
            }
        }
        if (st.length==0)
        {
            reject("Failed finding the student with the highest GPA")
        }
        else
        {
            resolve(st[0])
        }
    })
}

    
