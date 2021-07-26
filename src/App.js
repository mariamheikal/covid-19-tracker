import React from "react";
import { UserProvider } from "./context/UserContext";
import Router from "./Router";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../node_modules/leaflet/dist/leaflet.css';

const App = () => {


  return (
    <div className="container">
      <UserProvider>
        <Router />
      </UserProvider>
    </div>
  );
};

export default App;