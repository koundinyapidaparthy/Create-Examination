const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});
require("./db/conn");
const NavigusModel= require('./models/navigusSchema');
const TeacherModel= require('./models/TeacherUpload');
const app=express();
app.use(express.json());

const port =process.env.PORT;

app.get("/", (req,res)=>{
        res.send("");
})

app.post("/signin",async (req,res)=>{
    const { username,useremail,userphoto,userage,userprofession,UniqueId} = req.body;
    console.log(username,useremail,userphoto,userage,userprofession,UniqueId);
    
    try{
        if(!username || !useremail || !userphoto || !userage || !userprofession || ! UniqueId){
            return res.status(422).json({ error: "Provide All Details",status:422 });
        }
        const userExist = await NavigusModel.findOne({ useremail: useremail });
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist",status:422 });
        }  
        else {
            const Navschema=new NavigusModel({
                username,useremail,userphoto,userage,userprofession,UniqueId
            });
            const result=await Navschema.save();
            console.log(result);
            return res.status(201).json({ message: "user registered successfuly",status:201 });
        }
    }
    catch(e){
        console.log(e);
    }
})
app.post("/Teacher",async (req,res)=>{
    const { logindata} = req.body;
    
    try{
        if(!logindata){
            return res.status(422).json({ error: "Provide All Details",status:422 });
        }
        const userExist = await NavigusModel.findOne({ UniqueId: logindata });
        if (!userExist) {
            return res.status(422).json({ error: "Sorry You Didn't Logined",status:422 });
        }  
        else {
            console.log(userExist);
            return res.status(201).json({ message: "ThankYou for conforming",
            status:201,
            username:userExist.username,
            userprofession:userExist.userprofession
        });
        }
    }
    catch(e){
        console.log(e);
    }
})
app.post("/TeacherUpload",async (req,res)=>{
    const { SubjectName,QuizName,Array1} = req.body;
    console.log(SubjectName,QuizName,Array1);
    for(i=0;i<Array1.length;i++){
        if(!Array1[i].question || !Array1[i].option1 || !Array1[i].option2 || !Array1[i].option3 || !Array1[i].option4 || Array1[i].correctOption=="none"){
            return res.status(422).json({ error: "Provide All Details",status:422 });
        }
    }
    try{
        if(!SubjectName|| !QuizName || Array1.length==0 ){
            return res.status(422).json({ error: "Provide All Details",status:422 });
        }
        
        const userExist = await TeacherModel.findOne({ QuizName: QuizName });
        if (userExist) {
            return res.status(422).json({ error: "Quiz Name Already Exist",status:422 });
        }  
        else {
            const Teacherschema=new TeacherModel({
                SubjectName,QuizName,Array1
            });
            const result=await Teacherschema.save();
            console.log(result);
            return res.status(201).json({ message: "Quiz is Ready",status:201 });
        }
    }
    catch(e){
        console.log(e);
    }
})
app.post("/QuizsAlreadyUploaded",async (req,res)=>{
    
    try{
        const userExist = await TeacherModel.find();
        console.log(userExist);
            return res.status(201).json({data: userExist});
    }
    catch(e){
        console.log(e);
    }
})


app.listen(port,()=>{console.log("success")})