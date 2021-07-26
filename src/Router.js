import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./home/Home";
import UserNavbar from "./user/UserNavbar";
import BaseNavbar from "./user/BaseNavbar";
import User from "./user/User";
import UserStatus from "./user/UserStatus";
import CovidGlobalMap from "./user/CovidGlobalMap";
import CovidLocalMap from "./user/CovidLocalMap";
const Router = () =>{

    const user =localStorage.getItem('user');

    return (
        <BrowserRouter>
        <Switch>
            {user?(
               <>
               <UserNavbar/>
               <Route exact path="/">
                <Home />
                </Route>
               <Route exact path ="/userstats">
                   <UserStatus/>
                   </Route>
               <Route path="/userstatus">
                   <User/>
               </Route>
               <Route path="/map">
                   <CovidGlobalMap/>
               </Route>
               <Route path="/covidtrackermap">
                   <CovidLocalMap/>
               </Route>
               </>
            ):(
            <>
            <BaseNavbar />
            <Route exact path="/">
                <Home />
                </Route>
            </>
            )}
        </Switch>
        </BrowserRouter>
    );
};

export default Router;