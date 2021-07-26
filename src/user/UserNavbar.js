import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
const UserNavbar = () => {

  const history = useHistory();
  const signOut = async () => {
    await auth.signOut();
    history.push("/");
    window.location.reload()

  };

    return (
        
        <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div class="container-fluid">
        <a class="navbar-brand" href="/"><img img src="images/logo.png"></img></a>

        <a class="logo" href="/">Covid-19 Tracker</a>
        <button class="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#main-navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
                <div class="dropdown">
    <button class="dropbtn">Health Status
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a class="nav-link" href="/userstatus">Update</a>
      <a class="nav-link" href="/userstats">Statistics</a>
      </div>
      </div>

      <div class="dropdown">
    <button class="dropbtn">Map
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a class="nav-link" href="/map">World Wide</a>
      <a class="nav-link" href="/covidtrackermap">Covid-19 Tracker</a>
      </div>
      </div>
<li>

<button  class="button button2" onClick={signOut} >
          Log out
        </button>
</li>
</ul>
</div>
 </div>
    </nav>
  )




};

export default UserNavbar;