import React from 'react'
import './user.css'
import { TextField } from '@mui/material';

const User = () => {
    return (
        <div className="users1">
           <h1 className="us">userform</h1>
           <div className="inputs">
           <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small" />
           <span className="in2">
           <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/>
           </span><br/><br/>
           <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/>
           <span> <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/></span>
           <span> <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/></span><br/><br/>
           <span> <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/></span>
           <span> <TextField id="outlined-basic" label="Outlined" variant="outlined" size="small"/></span>
           </div>
          
        </div>
    )
}

export default User
