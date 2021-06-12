import React,{ useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import './SidebarChat.css';
import db from "./firebase";
import { Link } from "react-router-dom";
import EllipsisText from "react-ellipsis-text";

function SidebarChat({ id, name, addNewChat }) {

    const [seed,setSeed] = useState("");
    const [messages,setMessages] = useState("");


    useEffect(() => {
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc) => doc.data()))
            ));
        }
    },[id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, []);


    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
        if(roomName){
            db.collection("rooms").add({
                name: roomName,
            });    
        }
    };

    return !addNewChat ? (
        // for changing id in url when we click on different chat rooms-> /rooms/${id}
        <Link to={`/rooms/${id}`}> 
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h4>{name}</h4>
                    <p><EllipsisText text={messages[0]?.message || ""} length={"40"} /></p>
                </div>    
            </div>
        </Link>

    ) : (
        <div onClick = { createChat } className="sidebarChat">
            <h2>Add new chat</h2>
        </div>

    );
}

export default SidebarChat
