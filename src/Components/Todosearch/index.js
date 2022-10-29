import React, { useState } from "react";
import Button from '@mui/material/Button';
import { db } from "../../configure/firebaseInitilize";
import { doc, setDoc, collection } from "firebase/firestore";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import uuid from "uuidv4";
const Todosearch = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.uid;
  const colletionRef = collection(db, userId);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function adduser() {
    if(title){

      const newuser = {
        title,
        desc,
        userId,
        id: uuid(),
      };
  
      try {
        const userRef = doc(colletionRef, newuser.id);
        await setDoc(userRef, newuser);
        setTitle("")
        setDesc("")
      } catch (error) {
        console.error(error);
      }
    }
    else{
      alert('please give Title')
    }
  }
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      
      }}
      noValidate
      autoComplete="off"
    >
      
        <h1 style={{margin:'0px',padding:'0px'}}>Hello user...</h1>
        <Box sx={{display:'flex',flexDirection:{ xs: "column", md: "row" },alignItems:'center',justifyContent:'center',textAlign:'center'}}>

        <TextField id="standard-basic" label="Title" variant="standard" value={title}
        onChange={(e) => setTitle(e.target.value)} required / >      
        <TextField
          id="standard-textarea"
          label="Description"
          placeholder="Placeholder"
          multiline
          variant="standard"
          value={desc} onChange={(e) => setDesc(e.target.value)}
        />
        <Button variant="contained"sx={{maxHeight:'2rem',marginBottom:'0', width:'8rem'}} onClick={() => adduser()}>Contain</Button>
        </Box>
      
      </Box>
  );
};

export default Todosearch;
