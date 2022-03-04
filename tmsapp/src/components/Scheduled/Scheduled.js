import React, {useEffect, useState } from 'react'
import './scheduled.css'
import { Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import BasicModal from '../card/Cardview';
const Scheduled = () => {

    const [scheduledtrainers,setScheduledtrainers] = useState([]);
    const [search,setSearch]=useState("");


async function searching(){
    scheduledtrainers.map((i)=>{
    if(i.uname===search){
        console.log("find");
        setScheduledtrainers(scheduledtrainers.filter(el=>el.uname == search));  
    }
    else if(i.qual===search) {
        console.log("find");
        setScheduledtrainers(scheduledtrainers.filter(el=>el.qual == search));
    }
    else if(i.emp===search) {
        console.log("find");
        setScheduledtrainers(scheduledtrainers.filter(el=>el.emp == search));
    }
    }) 
    }

//getting all scheduledtrainers
async function scheduledtrainerslist(){
    const response = await fetch(`http://localhost:5000/api/allocated`)
    const result= await response.json();
    setScheduledtrainers(result);
}

useEffect(() => {
   scheduledtrainerslist();
}, [search])

    return (
        <div className="shfull">
            <h1 className="sh">scheduled trainers</h1>
            <FormControl variant="standard">
            <Input className="searchsh" value={search} style={{width: 300,backgroundColor: "white",paddingLeft: 10,borderRadius: 20}} id="input-with-icon-adornment"
            endAdornment={<InputAdornment><SearchIcon onClick={searching} style={{cursor:'pointer'}}/></InputAdornment>}
            onChange={(event)=>setSearch(event.target.value)}/>
            </FormControl>

            <Table className="shtab" style={{width: 500}}>
              <TableHead>
                  <TableRow style={{backgroundColor:'black'}}>
                       <TableCell style={{color:'white'}}>Name</TableCell>
                       <TableCell style={{color:'white'}}>Startdate</TableCell>
                       <TableCell style={{color:'white'}}>Enddate</TableCell>
                       <TableCell style={{color:'white'}}>Time</TableCell>
                       <TableCell style={{color:'white'}}>Day</TableCell>
                       <TableCell style={{color:'white'}}></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {scheduledtrainers.map((i,key)=>(
              <TableRow key={key} style={{backgroundColor:'white'}}>
              <TableCell>{i.uname}</TableCell>
              <TableCell>{i.startdate}</TableCell>
              <TableCell>{i.enddate}</TableCell>
              <TableCell>{i.time}</TableCell>
              <TableCell>{i.day}</TableCell>
              <TableCell><BasicModal item={i}></BasicModal></TableCell>
              </TableRow>
                  ))}
              </TableBody>
            </Table>
        </div>
    )
}

export default Scheduled
