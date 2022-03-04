const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/tmsapp")


const Schema=mongoose.Schema

const allocatedtrainersschema=new Schema({
    uname:String,
    email:String,
    phone:Number,
    qual:String,
    subj:Array,
    comp:String,
    batch:String,
    emp:String,
    courseid:String,
    time:String,
    startdate:Date,
    enddate:Date,
    meeting:String,
    schedule:String,
    day:String
})

const allocateddata=mongoose.model("allocatedtrainers",allocatedtrainersschema);
module.exports=allocateddata;