import React, { useEffect, useState } from 'react'
import './allocation.css'
import { TextField, Button, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router';


const Allocation = (props) => {

    // const {id} = props;
    const {item} = props;

    // console.log(item);

    const navigate=useNavigate();
   
    const [trainer,setTrainer]=useState([]);
    const [batch,setBatch]=useState("");
    const [courseid,setCourseid]=useState("");
    const [day,setDay]=useState("");
    const [time,setTime]=useState("");
    const [startdate,setStartdate]=useState("");
    const [enddate,setEnddate]=useState("");
    const [meeting,setMeeting]=useState("");
    const [schedule,setSchedule]=useState("");
    const [activetrainers,setActivetrainers]=useState([]);
  


 //checking for the same name   
async function allocated(){
   if (batch && courseid && day && time && startdate && enddate && meeting && schedule ) {
    const newname=item.uname;
    console.log(newname);
    const response = await fetch(`http://localhost:5000/api/allocated/${newname}`);
    const result= await response.json();
    console.log(result);
    setActivetrainers(result);

  if(result.length===0){
    scheduleallocate();
    }
    else if(result.length>0){
        console.log("length is greater");
        const name=result[0].uname;
        newschedule(name);
    }
   } else {
       alert("enter all details");
   }
   
}

//saving allocated details into allocatedtrainers collection
async function scheduleallocate(){
    const uname=item.uname;
    const email=item.email;
    const phone=item.phone;
    const qual=item.qual;
    const skills=item.skills;
    const comp=item.comp;
    const emp=item.emp;
    await  fetch("http://localhost:5000/api/scheduled",{
        method:"post",
        body:JSON.stringify({uname,email,phone,qual,skills,comp,batch,emp,courseid,day,time,startdate,enddate,meeting,schedule}),
        headers: {
            "Content-Type":"application/json"
        }
    })
    emailsheduled(uname,email,batch,courseid,day,time,startdate,enddate,meeting,schedule);
    navigate("/scheduledlist");
}

async function emailsheduled(uname,email,batch,courseid,day,time,startdate,enddate,meeting,schedule){
    const result=await fetch("http://localhost:5000/api/sheduledemail",{
        method:"post",
        body:JSON.stringify({uname,email,batch,courseid,day,time,startdate,enddate,meeting,schedule}),
        headers: {
            "Content-Type":"application/json"
        }
    })
}




//checking for allocated time schedules
async function newschedule(name){
   
    const result= await fetch(`http://localhost:5000/api/allocated/${name}/${time}/${day}/${startdate}/${enddate}`);
     const response= await result.json();
    console.log(response);
    if (response.length==0) {
        scheduleallocate();
    } else {
        alert("already scheduled");
    }

}


useEffect(()=>{

},[])

    return (
        <div className="allo">
           <div className="allocateform">
            <form>
                <div>
                <TextField label="Id" variant="filled" style = {{width: 150}} size="small" InputProps={{ readOnly: true,}}/>
                <span className="text2">  <TextField label="name" variant="filled" size="small" style = {{width: 200}} value={item.uname}  InputProps={{ readOnly: true,}}/></span> 
                <span className="text2"><TextField label="qualification" variant="filled" size="small" style = {{width: 175}} value={item.qual} InputProps={{ readOnly: true,}}/></span><br/><br/>
                <TextField label="skills" variant="filled" size="small" style = {{width: 170}}  value={item.skills} InputProps={{ readOnly: true,}}/>
                <span className="text2"><Select value={batch} displayEmpty onChange={(e)=>setBatch(e.target.value)} size="small" style = {{width: 180}} variant="filled">
                <MenuItem value="" disabled>select batch</MenuItem>
                <MenuItem value="batch1">batch1</MenuItem>
                <MenuItem value="batch2">batch2</MenuItem>
                <MenuItem value="batch3">batch3</MenuItem>
                <MenuItem value="batch4">batch4</MenuItem>
                </Select></span>
                <span className="text2">
                <Select  value={courseid} displayEmpty onChange={(e)=>setCourseid(e.target.value)} size="small" style = {{width: 180}} variant="filled">
                <MenuItem value="" disabled>course id</MenuItem>
                <MenuItem value="fsd">FSD</MenuItem>
                <MenuItem value="rpa">RPA</MenuItem>
                <MenuItem value="cyber">DSA</MenuItem>
                <MenuItem value="test">CSA</MenuItem>  
                </Select>
                </span><br/><br/>
                <TextField type="time" size="small" label="time(24hr)" style = {{width: 180}} name="time" focused value={time} onChange={(e)=>setTime(e.target.value)} variant="filled"/>
                <span className="text2">
                <Select variant="filled" value={day} displayEmpty onChange={(e)=>setDay(e.target.value)} size="small" style = {{width: 360}}>
                <MenuItem value="" disabled>day</MenuItem>
                <MenuItem value="sunday">sundays</MenuItem>
                <MenuItem value="monday">mondays</MenuItem>
                <MenuItem value="tuesday">tuesdays</MenuItem>
                <MenuItem value="wednesday">wednesdays</MenuItem>
                <MenuItem value="thursday">thursdays</MenuItem>
                <MenuItem value="friday">fridays</MenuItem>
                <MenuItem value="saturday">saturdays</MenuItem> 
                </Select>
                </span>
                 <br/><br/>
                <TextField variant="filled" type="date" size="small" label="start date" focused style = {{width: 270}} value={startdate} onChange={(e)=>setStartdate(e.target.value)}/>
                <span className="text2"><TextField variant="filled" type="date" size="small" label="end date" focused style = {{width: 270}} value={enddate} onChange={(e)=>setEnddate(e.target.value)}/></span><br/><br/>
                <TextField variant="filled" size="small" label="meeting link"  style = {{width: 550}} value={meeting} onChange={(e)=>setMeeting(e.target.value)} /><br/><br/>
                <TextField variant="filled" size="small" label="schedule"  style = {{width: 550}} value={schedule} onChange={(e)=>setSchedule(e.target.value)}/><br/><br/>
               <Button variant="contained" color="success" onClick={allocated} style = {{float: 'right'}}>schedule</Button>
              </div>
            </form>
           </div>
         </div>
    )
}
export default Allocation
