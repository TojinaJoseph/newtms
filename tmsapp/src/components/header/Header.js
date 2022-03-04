import React from 'react'
import {AppBar, Toolbar, Typography, Grid, Link} from '@mui/material'
import './header.css'


const Header = () => {
    return (
        <div className="headd">     
         <AppBar style={{backgroundColor: "black"}}>
            <Grid container>
               <Toolbar>
               <a className="areg" href="/register" style={{textDecoration: "none",color: "white"}}>
                <Typography style={{textDecoration: "none",color: "white"}}>HOME</Typography>
                </a>
                <a className="arreg" href="/userlist" style={{textDecoration: "none",color: "white",paddingRight: 20,marginLeft: 330}}>
                <Typography className="reg">REQUESTS</Typography>
                </a>
                <a className="apreg" href="/approvedlist" style={{textDecoration: "none",color: "white",paddingRight: 20}}>
                <Typography className="reg">APPROVEDLIST</Typography>
                </a>
                <a className="sreg" href="/scheduledlist" style={{textDecoration: "none",color: "white"}}>
                <Typography className="reg">SCHEDULEDLIST</Typography>
                </a>
               </Toolbar>
            </Grid>
        </AppBar> 

        </div>
    )
}

export default Header
