const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/tmsapp")


const Schema=mongoose.Schema

const userschema=new Schema({
    uname:String,
    email:String,
    phone:Number,
    pass:String,
    qual:String,
    skills:Array,
    comp:String,
    address:Array,
    designation:String,
    ictcourses:Array,
    status:
    {
        type:String,
        default:"pending"
    },
    emp:String
})

const userdata=mongoose.model("users",userschema);
module.exports=userdata;