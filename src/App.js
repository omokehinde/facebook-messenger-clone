import React, {useState, useEffect} from 'react';
import './App.css';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import Message from './Message';
import db  from './firebase.js';
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(()=>{
    // run once when the component loads
    db.collection('messages')
    .orderBy('timestamp', 'asc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));
    });
  }, [] );

  useEffect(()=>{
    // runs code here 
    setUsername(prompt('Please enter your name.'));
  }, [] ); // condition

  const sendMessage = (event) => {
    /// This sends the message and saves to firestore
    // set messages and update it with most recent message 
    event.preventDefault();
    db.collection('messages').add({
      message: input, 
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  }
  
  return (
    <div className="App">
      <img src="fb-messanger-logo.JPG" />
      <h1>facebook messanger clone... <span>&#128540;</span>
      <span>&#128579;</span>
      <span>&#128640;</span>! </h1>
      <h2>Welcome {username}. </h2>
      {/* To dos  */}
      <form className="app__form">
        {/* material-ui form control */}
        <FormControl className="app__formControl">
        {/* input label and field  */}
          <Input className="app__input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)} />
          <IconButton className="app__iconButton"
           variant="contained" color="primary" type='submit' 
           disabled={!input}  onClick={sendMessage}>
             <SendIcon/>
          </IconButton>
        </FormControl>
      {/* buttons  */}
      </form>
      {/* messages */}
      <FlipMove>
        {
          messages.map(({id,message}) => (
            <Message key={id} username={username} message={message} />
            ))
        }
      </FlipMove>
    </div>
  );
}

export default App;
