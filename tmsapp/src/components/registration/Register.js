import React, { useState } from 'react'
import { TextField, Button, Grid } from '@mui/material';
import Header from '../header/Header';
import './register.css'
import { useNavigate } from 'react-router';

const Register = () => {

let navigate=useNavigate();

const[formvalue,setFormvalue]=useState({uname:"",email:"",phone:"",address:"",pass:"",qual:"",skills:"",comp:"",designation:"",ictcourses:"",status:"",emp:""})



const handleChange=(event)=>{
    // console.log(event.target);
const {name,value}=event.target;
setFormvalue({...formvalue,[name]:value})

}

const handlesubmit=(event)=>{
    event.preventDefault();
     navigate("/userlist");
}

async function fetchregister(){
    const uname=formvalue.uname;
    const email=formvalue.email;
    const phone=formvalue.phone;
    const addr=formvalue.address;
    const pass=formvalue.pass;
    const qual=formvalue.qual;
    const skills=formvalue.skills;
    const comp=formvalue.comp;
    const des=formvalue.designation;
    const ictcourses=formvalue.ictcourses;
     

       if (uname && email && phone && pass && qual && skills && comp && addr && des && ictcourses) {
           const response=await fetch("http://localhost:5000/api/register",{
               method: "post",
               body:JSON.stringify({uname,email,phone,pass,qual,skills,comp,addr,des,ictcourses}),
               headers: {
                   "Content-Type":"application/json"
               }
           })
       const body=await response.json();

       } else {
           console.log("error occured");
       }

}

    return (
        <div className="register" >
            <div className="enroll" style={{backgroundColor: 'black'}}>
             <h1 style={{color: 'white'}}>REGISTER</h1>
             <form onSubmit={handlesubmit}>
            <TextField id="standard-basic" label="name" variant="standard" name="uname" value={formvalue.uname} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="emailid" variant="standard" name="email" value={formvalue.email} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="phoneno" variant="standard" name="phone" value={formvalue.phone} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="address" variant="standard" name="address" value={formvalue.address} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="password" variant="standard" name="pass" value={formvalue.pass} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="qualification" variant="standard" name="qual" value={formvalue.qual} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="skills" variant="standard" name="skills" value={formvalue.skills} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="current company" variant="standard" name="comp" value={formvalue.comp} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="designation" variant="standard" name="designation" value={formvalue.designation} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <TextField id="standard-basic" label="ictcourses" variant="standard" name="ictcourses" value={formvalue.ictcourses} onChange={handleChange} style={{backgroundColor: 'white'}}/><br/><br/>
            <Button variant="contained" fullWidth type="submit" onClick={fetchregister} color="success">submit</Button>
            </form>
            </div>
           
        </div>
    )
}

export default Register
