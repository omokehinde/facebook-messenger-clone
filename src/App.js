import React, {useState, useEffect} from 'react';
import './App.css';
import {Button, FormControl, InputLabel, Input} from '@material-ui/core';
import Message from './Message';
import db  from './firebase.js';
import firebase from "firebase";
import FlipMove from 'react-flip-move';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(()=>{
    // run once when the component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
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
      <h1>Hello Clever Programmer <span>&#128540;</span>
      <span>&#128579;</span>
      <span>&#128640;</span>! </h1>
      <h2>Welcome {username}. </h2>
      {/* To dos  */}
      <form>
        {/* material-ui form control */}
        <FormControl>
        {/* input label and field  */}
          <InputLabel >Type a message here...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Button variant="contained" color="primary" type='submit' 
            disabled={!input}  onClick={sendMessage}>
            Send Message
          </Button>
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
