import React from "react";
import "./Profile.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useStateValue } from "./StateProvider";
import CreateIcon from '@material-ui/icons/Create';
import { actionTypes } from "./reducer";
import { IconButton } from "@material-ui/core";

const Box = ({ heading,value }) =>{
    return(
        <div className="profile__name">
            <div className="name__heading">
                <p>{heading}</p>
            </div>
            <div>
                <div className="display__name">
                    {value}
                    <CreateIcon/>
                </div>   
            </div>

        </div>

    )
}

const Profile = () => {


    const [{ user }, dispatch] = useStateValue();

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div onClick = {() => dispatch({
                        type: actionTypes.SET_SHOWPROFILE,
                        showProfile: false
                    })}>
                    <IconButton  >
                        <ArrowBackIcon style = {{color:"white" }} />
                    </IconButton>
                </div>
               
              <p style = {{marginLeft: "10px" }}>Profile</p>  
            </div>

            <div className="profile__image">
                <div className="inner__img">
                <img src={user?.photoURL}/>
                
                </div>
            </div>
            <Box heading="Your Name" value={user.displayName}/>
            <p className="dummy__text">
                This is not your username or pin. This name will be visible to your WhatsApp contacts only.</p>
            <Box heading="About" value="Hey there! I am using WhatsApp."/>
            
        </div>
    )
}

export default Profile;
