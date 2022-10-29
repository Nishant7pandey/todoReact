import React,{Suspense} from 'react';
import LandingPage from "../Components/Landingpage"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from '../Components/TodoList';
import ProfileInfo from '../Components/ProfileInfo';
// import Profile from '../Components/Profile';
import ProfileHOC from '../HOC';
// import ProfileOnboarding from '../ProfileOnboarding'


const Nav = () => {
    return (
        <Suspense fallback={<div>Loading....</div>} >
            <Router>
                <Routes>
              <Route path="/" element={<LandingPage/>}></Route>
              <Route path="/ProfileInfo" element={<ProfileHOC><ProfileInfo/>
              </ProfileHOC>}></Route>
              {/* <Route path="/ProfileOnboarding" element={<ProfileOnboarding/>}></Route> */}
              <Route path="/TodoList" element={<ProfileHOC>
                <TodoList/>
                </ProfileHOC>}>

                </Route>

                </Routes>
            </Router>
        </Suspense >
    );
}

export default Nav;
