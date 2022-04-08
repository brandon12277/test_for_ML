const express=require("express");
const {spawn}=require("child_process");
const bodyParser=require("body-parser");
const ejs=require("ejs")
const { urlencoded } = require("body-parser");



const app=express();
 const port=process.env.port||3000;
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(express.static("static"));
 app.set("view engine","ejs")
 app.listen(port,()=>{
     console.log("server running");
 });





app.post("/answer",(req,res)=>{
     let age=req.body.age;
     let salary=req.body.salary;
    let ans="";
    const file=spawn("python",["logistic_regression.py",age,salary]);
    file.stdout.setEncoding("utf8");
    file.stdout.on("data",async data=>{
       
            ans=data[0];
            console.log(ans);
            return res.render("home",{ans:ans})
    
})

file.on("error",error=>{console.log(error);})



})

app.get("/",(req,res)=>{
  
    res.render("home",{ans:"hello"});
})