import React, { useEffect, useState } from "react";
import { db } from "../../configure/firebaseInitilize";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {
  doc,
  onSnapshot,
  deleteDoc,
  getDocs,
  query,
  where,
  collection,
  updateDoc,
} from "firebase/firestore";

const Todolistdetail = () => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const[desc,setDesc]= useState('')
  // const[clicked,setclicked]= useState(false);
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.uid;
  const colletionRef = collection(db, userId);
  const consoleData =()=>{
    const q = query(colletionRef  ,
      where('userId',"==",userId)
      );
    setLoading(true);
    const sub = onSnapshot(colletionRef,(querySnapshot)=>{
      const item =[];
      querySnapshot.forEach((doc)=>{
        item.push(doc.data());
      })
      setusers(item)
      setLoading(false)
    })
    return() =>{
      sub();
    }
  }
  useEffect(() => {
    consoleData()
  }, []);
  async function deleteuser(user) {
    try {
      const userRef = doc(colletionRef, user.id);
      await deleteDoc(userRef, userRef);
    } catch (error) {
      console.log(error);
    }
  }
  // async function updateuser(user){
  //   const data = {
  //     desc:''
  //   }
  //   try{
  //     const userRef = doc(colletionRef,user.id);
  //     await updateDoc(userRef ,data)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  
  return (
    <div style={{display: 'flex',
    margin: 'auto 35px',
    padding: '10px',
    flexWrap: 'wrap',
    gap: '50px',
    alignItems:'center',
    justifyContent: 'center',
    
    }}>
      {loading ? <h1>Loading...</h1> : null}
      {users.map((user) => (
        <div className="user" key={user.id} style={{
          minWidth:'318px',
          minHeight: '158px',
          padding: '5px',
          background:' #ffffff',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection:"column",
          cursor: 'pointer',
        }}
        >
          <Checkbox {...label}  desabled color="success" />
          <h2 style={{margin:'0'}}>{user.title}</h2>
          <p >{user.desc}</p>

          <Button  startIcon={<DeleteIcon />} onClick={() => deleteuser(user)} >
        Delete
      </Button>  

        
      {/* <IconButton aria-label="delete" size="large" onClick={() => deleteuser(user)}>
        <DeleteIcon fontSize="inherit" />
      </IconButton> */}
      {/* <IconButton aria-label="delete" size="large" onClick={() => updateuser(user)}>
        // {/* <DeleteIcon fontSize="inherit" /> */}
         {/* </IconButton> */} 
      
          
        </div>
      ))} 
      
    </div>
  );
};

export default Todolistdetail;
