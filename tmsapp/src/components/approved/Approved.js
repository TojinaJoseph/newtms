import React, { useEffect, useState } from 'react'
import './approved.css'
import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import { useNavigate } from 'react-router';
import CustomizedDialogs from '../dialogubox/Dialogu';
import Allocation from '../allocation/Allocation';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


const Approved = (props) => {

 const navigate=useNavigate();

 const [active,setActive]=useState([]);
 const [search,setSearch]=useState("");
 

async function searching(){
    active.map((i)=>{
if(i.uname===search){
    console.log("find");
    setActive(active.filter(el=>el.uname == search));  
}
else if(i.qual===search) {
    console.log("find");
    setActive(active.filter(el=>el.qual == search));
}
else if(i.emp===search) {
    console.log("find");
    setActive(active.filter(el=>el.emp == search));
}
    })
 
}

//fetching approvedlist
 async function fetchapproved(){
      const response=  await fetch("http://localhost:5000/api/approvedlist")
         const body= await response.json();
         setActive(body);     
 } 
 

useEffect(()=>{
    fetchapproved();
},[search])

    return (
    <div className="approved">
        <h2 className="approve">Approved list </h2>
            <FormControl variant="standard">
            <Input className="search" value={search} style={{width: 300,paddingLeft: 10,borderRadius: 20}} id="input-with-icon-adornment" 
            endAdornment={<InputAdornment position="start"><SearchIcon onClick={searching} style={{cursor:'pointer'}}/></InputAdornment>}
            onChange={(event)=>setSearch(event.target.value)}/>
            </FormControl>
            <Table className="approvetable" style={{width: 600}}>
              <TableHead>
                  <TableRow style={{backgroundColor:'black'}}>
                       <TableCell style={{color:'white'}}>name</TableCell>
                       <TableCell style={{color:'white'}}>qualification</TableCell>
                       <TableCell style={{color:'white'}}>employment</TableCell>
                       <TableCell style={{color:'white'}}>skills</TableCell>
                       <TableCell style={{color:'white'}}>Allocation</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {active.map((i,key)=>(
                <TableRow key={key} style={{backgroundColor:'white'}}>
                    <TableCell>{i.uname}</TableCell>
                    <TableCell>{i.qual}</TableCell>
                    <TableCell>{i.emp}</TableCell>
                    <TableCell>{i.skills}</TableCell>
                    <TableCell><CustomizedDialogs><Allocation item={i}/></CustomizedDialogs></TableCell>
                </TableRow>
                  ))}
              </TableBody>
            </Table>
        </div>
    )
}

export default Approved
