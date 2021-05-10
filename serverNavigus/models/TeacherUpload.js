const mongoose = require('mongoose');
const TeacherSchema=new mongoose.Schema({
    SubjectName:{
        type:String,
    },
    QuizName:{
        type:String,
    },
    Array1:{
        type:Array,
    }
})
const TeacherModel=new mongoose.model("TeacherSchema",TeacherSchema);
module.exports= TeacherModel;