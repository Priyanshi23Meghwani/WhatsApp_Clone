import React, { useEffect, useState, useRef } from 'react';
import "./Chat.css";
import { Avatar, IconButton, Input } from "@material-ui/core";
import { AttachFile } from '@material-ui/icons';
import{ SearchOutlined} from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
// for getting roomid after /rooms/
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import SendIcon from '@material-ui/icons/Send';
import { storage } from './firebase';

function Img({ src }) {
    const style = {
        imgMsg : {
    height: "auto",
    maxHeight: "250px",
    width: '100%',
    borderRadius:'10px',
    
        }
    }
    return(
        <>
        <img style={style.imgMsg} src={src}/>
        <br/>
        </>
    )

}

function Chat() {
    const [message,setMessage] = useState("");
    const [seed,setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    
    const scroll = useRef();
    
    // function for image upload
    const onImageUpload = (event) => {
        if(event.target.files[0])
        {
            let img = event.target.files[0]
            const uploadTask = storage.ref(`/chat-images/${img.name}`).put(img);
            uploadTask.on('state_changed',
            (snapshot) => console.log(snapshot),
             (err) => console.log(err),
             async () => {
                 const imgUrl = await storage.ref('chat-images').child(img.name).getDownloadURL();
                 console.log(imgUrl);
                

                 

                 db.collection('rooms').doc(roomId).collection('messages').add({
                image:imgUrl ,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),

                 
                });
             }

             )

                //storage.ref('images').child(imageAsFile.name).getDownloadURL()
       //.then(fireBaseUrl => {
        //setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            
            
        }    
    }

    useEffect(()=>{
        // console.log(scroll)
        scroll.current?.scrollIntoView();
    },[messages])
    //triggers func everytime roomId changes
    useEffect(() =>{
        if(roomId){
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map(doc => doc.data()))
            );
        }

    },[roomId]);

    // for randomising value in avatar get-url
    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [roomId]);

    const sendMessage = (e) =>{
        e.preventDefault();
        // console.log("You typed in>>", message);


        db.collection('rooms').doc(roomId).collection('messages').add({
            message: message,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setMessage("");
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {" "}
                    {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>  <SearchOutlined/>  </IconButton>
                    
                    <IconButton>  <MoreVertIcon/>    </IconButton>
                </div>
            </div>

            <div className="chat__body">

                {messages.map(message => {
                    const time = new Date(message.timestamp?.toDate()).toUTCString()
                    return(
                        <div>

                            <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                                                
                                <span style={{color: `${message.name === user.displayName &&  "#ed6634"} `}} className="chat__name">{message.name}</span>


                                    {message.message!=="" && message.message ? message.message : <Img src={message.image}/>}
                                    <br/>
                                <span className="chat__timestamp">
                                    {time}
                                </span>
                            </p>
                            {/* <img src={image}></img> */}
                            <div ref= {scroll}>      
                            </div>

                        </div>    
                    )
                    })}
               
            </div>

            <div className="chat__footer">
                <IconButton>
                      <InsertEmoticonIcon/>
                </IconButton>
                <div className="file-upload">
                     <input type='file' id="image-upload" onChange={onImageUpload} hidden/> 
                <IconButton> 
                    <label htmlFor="image-upload">
                   <AttachFile style={{height:'23px',cursor:'pointer'}}/>
                    </label>
                </IconButton>
                </div>
                <form>
                    <input style ={{outline:'none'}}  value={message} onChange={(e) => setMessage(e.target.value)}
                    type="text" placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                {/* if message is not null then change the icon */}
               { message !== ''? <SendIcon onClick={sendMessage}/>:<MicIcon/>}

            </div>
        </div>
    )
}

export default Chat
