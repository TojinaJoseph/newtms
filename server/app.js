const express=require("express");
const cors=require("cors");
const userdata=require("./model/user");
const nodemailer=require("nodemailer");
const allocateddata=require("./model/allocatedtrainers");

const port=5000;

const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//registering details
app.post("/api/register",async(req,res)=>{
    try {
        var item={
            uname:req.body.uname,
            email:req.body.email,
            phone:req.body.phone,
            pass:req.body.pass,
            qual:req.body.qual,
            skills:req.body.skills,
            comp:req.body.comp,
            address:req.body.addr,
            designation:req.body.des,
            ictcourses:req.body.ictcourses
        }
        let userinfo = new userdata(item);
        var result=await userinfo.save();
        res.json(result);
    } catch (error) {
        res.json("failed");
    }
  
})


//getting registered details for approving in front end
app.get("/api/userdetails",async (req,res)=>{
    try {
         await userdata.find({status:"pending"}).then(
             (user)=>{
                  res.json(user);
             }
         ) 
    } catch (err) {
        res.json("error");
    }
})

//rejecting
app.post("/api/user/:id/delete", (req,res)=>{
    try {
        const id=req.params.id;
         userdata.findOneAndDelete({_id:id}).then((person)=>{
         res.json(person);
         console.log(person);
         })

    } catch (error) {
        res.json("error");
    }
});


//updating status as approved
app.post("/api/updatestatus/:id",async (req,res)=>{
    const emp=req.body.employ;   
   const id=req.params.id;
   const filter = {_id:id};
   const update = {$set:{status:"approved",emp:emp}};
   userdata.findOneAndUpdate(filter,update,{new:true}).then((user)=>{
       res.json(user);
   })
   })

   //getting eachuser for sending email
app.get("/api/select/:id",async (req,res)=>{
    try {
        const id=req.params.id;
       await userdata.find({_id:id}).then(
           (values)=>{
res.json(values);
           }
       )
    } catch (error) {
        console.log(error)
    } 
})

//sending confirmation email 
app.post("/api/mailer",(req,res)=>{
    console.log(req.body);
    var data1=req.body.email;
    var data2=req.body.uname;
    var data3=req.body.pass;
    var data4=req.body.employ;
    var transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"ictaktms@gmail.com",
            pass:"ictak123*"
        }
    
    });
     
    var mailoptions={
        from:"ictaktms@gmail.com",
        to: data1,
        subject:"confirmation of approval",  
        html: "<h3>You are approved as ICTAK trainer.Please login with username and password....</h3><br/><table border='1' width='70%' height='100px' style='border-collapse:collapse;'>\
                     <tr style='background-color: black;'>\
                        <th style='color: white;'>Username</th>\
                        <th style='color: white;'>Password</th>\
                        <th style='color: white;'>Employ type</th>\
                    </tr>\
                 <tr>\
                 <td style='text-align: center'>"+data2+"</td>\
                 <td style='text-align: center'>"+data3+"</td>\
                 <td style='text-align: center'>"+data4+"</td>\
                   </tr>\
                  </table><br/>"      
    };
    transporter.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
        else{
            console.log("email send successfully");
        }
    }); 
});


//generateid
app.post("/api//generateid/:id",(req,res)=>{
const id=req.params.id;
const filter = {_id:id};
const update = {$inc:{sino:1}};
userdata.findOneAndUpdate(filter,update,{new:true}).then((user)=>{
    res.json(user);
})
})


//fetching approvedlist
app.get("/api/approvedlist",async (req,res)=>{
    try {
        await userdata.find({status:"approved"}).then(
            (active)=>{
                  res.json(active);
            }
        )
    } catch (error) {
        console.log(error);
    }
   
})

// checking for the same name
app.get("/api/allocated/:newname",async (req,res)=>{
    const newname=req.params.newname;
 try {
    await allocateddata.find({uname:newname}).then((trainer)=>{
      res.json(trainer);
     })
 } catch (error) {
     console.log(error);
 }
     
 })

//saving allocated details into allocatedtrainers collection
app.post("/api/scheduled",async (req,res)=>{
    try {
        var items={
            uname:req.body.uname,
            email:req.body.email,
            phone:req.body.phone,
            qual:req.body.qual,
            skills:req.body.skills,
            comp:req.body.comp,
            batch:req.body.batch,
            emp:req.body.emp,
            courseid:req.body.courseid,
            time:req.body.time,
            startdate:req.body.startdate,
            enddate:req.body.enddate,
            meeting:req.body.meeting,
            schedule:req.body.schedule,
            day:req.body.day
  
        }
       
        let allocatedinfo = new allocateddata(items);
        var result=await allocatedinfo.save();
        res.json(result);
    } catch (error) {
        console.log(error)
    }
})


//checking for allocated time schedules 
app.get("/api/allocated/:name/:time/:day/:startdate/:enddate",async (req,res)=>{
    const time=req.params.time;
    const day=req.params.day;
    const startdate=req.params.startdate;
    const enddate=req.params.enddate;
    const name=req.params.name;
    try {
        await allocateddata.find({$and:[{uname: name},{startdate: startdate},{enddate: enddate},{day: day},{time: time}]}).then((trainer)=>{
          res.json(trainer);
            console.log(trainer);
         })
     } catch (error) {
         console.log(error);
     }      
})

//getting all scheduledtrainers
app.get("/api/allocated",async (req,res)=>{
    try {
       await allocateddata.find().then((trainer)=>{
         res.json(trainer);
        })
    } catch (error) {
        console.log(error);
    }    
    })


//sending email with scheduled details

app.post("/api/sheduledemail",(req,res)=>{
    console.log(req.body);
    var data1=req.body.uname;
    var data2=req.body.email;
    var data3=req.body.batch;
    var data4=req.body.courseid;
    var data5=req.body.day;
    var data6=req.body.time;
    var data7=req.body.startdate;
    var data8=req.body.enddate;
    var data9=req.body.meeting;
    var data10=req.body.schedule;

    var transporter=nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:"ictaktms@gmail.com",
            pass:"ictak123*"
        }
    
    });
     
    var mailoptions={
        from:"ictaktms@gmail.com",
        to: data2,
        subject: "Your shedule details",  
        html: "<h3>You are scheduled for the ictak course...</h3>\
        <h3>Name: " +data1+"</h3>\
        <h3>Batch: " +data3+"</h3>\
        <h3>CourseId: " +data4+"</h3>\
        <h3>Day: " +data5+"</h3>\
        <h4>Login to your account to view the complete details...</h4>"      
    };
    transporter.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err);
            res.send("something went wrong");
        }
        else{
            console.log("email send successfully");
        }
    }); 
});



app.listen(port,()=>{
    console.log("server running at "+port);
})