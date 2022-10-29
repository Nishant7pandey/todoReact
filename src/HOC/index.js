import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';


const routes = [
    {
        name: "ProfileInfo",
        path: "/ProfileInfo"
    },
    {
        name: "TodoList",
        path: "/TodoList"
    }
]
const ProfileHOC = ({children}) => {
    const navigate = useNavigate();
    const reRoute = (path) => {
        navigate(path);
    }
    return (
        <div style={{margin:'0px',padding:'0px'}}>
            {

            routes.map((route,index)=>{
                return (
                  
                    <Button sx={{width:'50%'}} variant="contained"   onClick = {()=> reRoute(route.path)} key={index}>
                  {route.name}
                     </Button>
                )
            })
            }
            {children}
        </div>
    );
}

export default ProfileHOC;
