const mongoose= require("mongoose");
const student= new mongoose.Schema
(
    {
        Name:String,
        Course:String,
        CertificateNo:String
    }
)
module.exports=mongoose.model('Student',student)