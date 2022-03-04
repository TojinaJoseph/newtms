import React, { useState, useEffect } from 'react'
import './userlist.css'
import { Button ,Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { useNavigate } from 'react-router';
import BasicModal from '../card/Usercardview';


const Userlist = (props) => {

   const navigate=useNavigate();
   
    const [employ,setEmploy]=useState("");
    const [user,setUser]=useState([]);
    const [approvedtrainer,setapprovedTrainer]=useState("");

//getting registered details for approving in front end
async function fetchuserlist(){
         const response=await fetch("/api/userdetails");
         const body=await response.json();
         setUser(body);   
}

useEffect(()=>{
    fetchuserlist();
},[user])

//rejecting
async function fetchdelete(e){ 
    const id=e.target.id;
    try {
       await fetch(`http://localhost:5000/api/user/${id}/delete`,{
       method: "post"})
    } catch (error) {
        console.log("error"); 
    }  
      setUser(user.filter(i=>i.id !== id));
}

//updating status as approved
async function fetchstatus(event){
    const id=event.target.id;
    if(employ){
       const updated= await fetch(`http://localhost:5000/api/updatestatus/${id}`,{
           method:"post",
           body:JSON.stringify({employ}),
           headers: {
            "Content-Type":"application/json"
        }
       })
      const up=await updated.json();
      fetchapprove(event);
    }
    else{
     alert("select employ type");
    }
}

//getting each user for sending mail
 async function fetchapprove(event){
     try { 
        const id=event.target.id;
        const result = await fetch(`http://localhost:5000/api/select/${id}`)
        const values =  await result.json();
        setapprovedTrainer(values);
        const item={
            uname:values[0].uname,
            email:values[0].email,
            pass:values[0].pass,
            }
                 fetchemail(item);
                 idgenerator(0,2);
                 navigate("/approvedlist");    
                 
     } catch (error) {
         console.log(error);
     }
 } 

 //sending confirmation email 
  async function fetchemail(item){
  const email=item.email;
  const uname=item.uname;
  const pass=item.pass;
  await fetch(`http://localhost:5000/api/mailer`,{
      method: "post",
       body:JSON.stringify({uname,email,pass,employ}),
      headers: {
          "Content-Type":"application/json"
      }
  })
 
 }

 async function idgenerator(){

// const idgenerated=
  console.log("idgenerated");
//    console.log(approvedtrainer[0].uname);
//    const id=approvedtrainer[0].id;
//    console.log(id);
//    await fetch(`http://localhost:5000/api/generateid/${id}`,{
//        method: "post"
//    })
 }

    return (
        <div className="usedetail">
            <h3 className="user">requests for approval</h3>
        <Table className="tabl"style={{backgroundColor:'black',width: 500}}>
            <TableHead>
                <TableRow>
                    <TableCell style={{color:'white'}}>Name</TableCell>
                    <TableCell style={{color:'white'}}>Qualification</TableCell>
                    <TableCell style={{color:'white'}}>Skills</TableCell>
                    <TableCell style={{color:'white'}}>Company</TableCell>
                    <TableCell style={{color:'white'}}>Employment</TableCell>
                    <TableCell style={{color:'white'}}></TableCell>
                    <TableCell style={{color:'white'}}></TableCell>
                    <TableCell style={{color:'white'}}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                    {user.map((i,key)=>(
                <TableRow key={key} style={{backgroundColor:'white'}}>
                    <TableCell>{i.uname}</TableCell>
                    <TableCell>{i.qual}</TableCell>
                    <TableCell>{i.skills}</TableCell>
                    <TableCell>{i.comp}</TableCell>
                    <TableCell>
                    <select className="optemploy" onChange={(e)=> setEmploy(e.target.value)}>
                    <option value="">select</option>
                    <option value="internal">internal</option>
                    <option value="empanel">empanel</option>
                    <option value="expert">industry expert</option>
                    </select>
                    </TableCell>
                    <TableCell style={{color:'white'}}><Button variant="contained" color="success" id={i._id} onClick={fetchstatus}>approve</Button></TableCell>
                    <TableCell style={{color:'white'}}><Button variant="contained" color="error" id={i._id} onClick={fetchdelete}>Reject</Button></TableCell>
                    <TableCell style={{color:'white'}}><BasicModal item={i}></BasicModal></TableCell>
                </TableRow>
))}
            </TableBody>
        </Table>
        </div>
    )
}
export default Userlist
