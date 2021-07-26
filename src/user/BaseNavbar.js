import React  from "react";
import { useHistory } from "react-router-dom";
import { signInWithGoogle } from "../firebase";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
const BaseNavbar = () => {
    const history = useHistory();

    const signIn = async () => {
        
      await signInWithGoogle();
      history.push("/");     
      window.location.reload()

    };


    return (
        
        <nav class="navbar navbar-expand-md navbar-light bg-light sticky-top">
        <div class="container-fluid">
        <a class="navbar-brand" href="/"><img img src="images/logo.png"></img></a>

        <a class="logo" href="/">Covid-19 Tracker</a>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          
        <button  class="button button2" onClick={signIn} >
        <span class="icon"></span>
          {"    "}Sign in with Google
        </button>
        </div>

        </div>
    </nav>
  )




};

export default BaseNavbar;