import React,{useState,useEffect} from 'react';
import { TextField, Grid, Box, Button } from "@mui/material";
import {db} from "../../configure/firebaseInitilize";
import {
  setDoc,collection,getDoc,query,onSnapshot,doc,deleteDoc
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import{useNavigate} from "react-router-dom";

const ProfileInfo = () => {
  const loginUser = JSON.parse(localStorage.getItem("user"))
  const [editState,setEditState] =useState(false);
  const[data,setData] = useState([]);
  
  const [candidateData,setCandidateData] =useState({
    name:'',
    email:loginUser.email,
    phone:'',
    education:"",
    experience:'',
    linkedIn:'',
  });
  const userId = loginUser.uid;
  const collectionRef = collection(db,"personalData");
  const editProfile = async()=>{
    
      const userRef =  doc(db, "personalData", userId);
      const dataRef = await getDoc(userRef);
      if(dataRef.exists()){
        console.log(dataRef.data())
        setCandidateData({...dataRef.data()})
        setEditState(false);

      }
      else{
        setEditState(true);
      }

    
  }
  useEffect(() => {
    editProfile();},[]);

  const saveProfile =async(e)=>{
    if(editState){

      e.preventDefault();
      const userRef = doc(collectionRef,userId);
      await setDoc(userRef,candidateData);
      setEditState(true);
    }
    setEditState(!editState);

  }
  const navigate = useNavigate();
  const logoutProfile =()=>{
    alert('Are you want to logout?')
    const auth = getAuth();
    signOut(auth).then(() => {
      // const d = doc(collectionRef,userId)
      // deleteDoc(d);
  localStorage.removeItem('users')
  navigate('/')
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  console.log(error)
});
  }
  return (
    <div style={{backgroundImage: "linear-gradient(to right, #DECBA4, #3E5151)", minHeight:"100vh"}}>
      <Grid container spacing={8} justifyContent="center">
            <Grid item xs={2} md={2}>
              <Button onClick={saveProfile}>
                {editState ? "save" : "Edit"}
              </Button>
            </Grid>
            <Grid item xs={2} md={2}>
              <Button onClick={logoutProfile}>Logout</Button>
            </Grid>
          </Grid>
          <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item xs={12} md={6}>
              <label>
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                disabled={!editState}
                required
                value={candidateData.name}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, name: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>
                email<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                disabled={!editState}
                required
                type="email"
                value={candidateData.email}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, email: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>
                Phone no.<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                disabled={!editState}
                required
                type="number"
                inputProps={{ maxLength: 10 }}
                value={candidateData.phone}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, phone: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Education</label>
              <TextField
                disabled={!editState}
                value={candidateData.education}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, education: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>Experience</label>
              <TextField
                disabled={!editState}
                value={candidateData.experience}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return { ...p, experience: e.target.value };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <label>linkedIn</label>
              <TextField
                disabled={!editState}
                value={candidateData.linkedIn}
                onChange={(e) => {
                  setCandidateData((p) => {
                    return {
                      ...p,
                      linkedIn: e.target.value,
                    };
                  });
                }}
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
              />
            </Grid>
            
          </Grid>
      </div>
    
  );
}

export default ProfileInfo;

