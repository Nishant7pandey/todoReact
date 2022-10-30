import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../configure/firebaseInitilize";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";


const Landingpage = () => {
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  // console.log(type);
  
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user})
        );
        localStorage.setItem("token", token);
        // const userInfo = getProfile({ userId: user.uid, token, user});

        // ...
        navigate("/ProfileInfo");
        // navigate("/ProfileOnboarding");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #DECBA4, #3E5151)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2
        style={{
          margin: "0em 0 0.5em 0",
          color: "#343434",
          fontSize: "8rem",
          lineHeight: "20px",
          fontWeight: "bold",
          fontFamily: "'Josefin Sans', Cursive",
        }}
      >
        Todo
      </h2>
      {/* <button onClick={signIn} >SignIn</button> */}
      <Button
        sx={{ width: "50%", color: "black", gap: "1rem", fontSize: "1.5em" }}
        variant="outlined"
        onClick={signIn}
      >
        SignIn <GoogleIcon />
      </Button>
    </div>
  );
};

export default Landingpage;
