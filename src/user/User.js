import React, { useState} from "react";
import { firestore } from "../firebase";

const User = () =>{
        const [temperature, setTemperature]=useState("");

   const user = localStorage.getItem('user');
   const saveStatus = async (e) =>{

    e.preventDefault();

    var cough='';
    var musclepain='';
    var headache='';

    var eleC =  document.getElementsByName('cough');
    for(var i = 0; i < eleC.length; i++) {
        if(eleC[i].checked){
            cough=eleC[i].value;
           eleC[i].checked=false;
           break;
        }
    }

    var eleM =  document.getElementsByName('musclepain');
    for(i = 0; i < eleM.length; i++) {
        if(eleM[i].checked){
            musclepain=eleM[i].value;
           eleM[i].checked=false;
           break;
        }
    }

    var eleH =   document.getElementsByName('headache');
    for(i = 0; i < eleH.length; i++) {
        if(eleH[i].checked){
            headache=eleH[i].value;
            eleH[i].checked=false;
            break;
        }
    }

     const date = new Date().toDateString();

    await firestore
    .collection("users")
    .doc(user)
    .collection("covid-status")
    .add({
        date,
        temperature,
        cough,
        musclepain,
        headache
    });
    setTemperature("");
    
localStorage.setItem('healthStatus', true);
   };
   
   return <div className="user">

    <br/>
    <br/>
        <h1 class="style5">Covid-19 Symptoms Tracker</h1>
        <br/>
        <h3 class="style7">Tell us how are you feeling today?</h3>
        <br/>
        <form name="form" class="alignedForm">
        <form class="form-inline">
        <label class="style2">
            Temperature:</label> 
            <input 
            type='text' 
            value={temperature} 
            onChange={(e)=> setTemperature(e.target.value)} 
            />
           </form>
           <br/>
            <p class="style2">Rate of Dry Coughs:</p>
            <form>
            <input 
                type='radio' 
            name="cough"
            value="high"
            />
            
            <label class="style3" for="high">High</label>
            <br/>
            <input 
            type='radio' 
            name="cough"
            value="medium"
            />
            <label class="style3" for="medium">Medium</label>
            <br/>
            <input 
            type='radio' 
            name="cough"
            value="low"
            />
            <label class="style3" for="low">Low</label>
            <br/>
            <input 
            type='radio' 
            name="cough"
            value="none"
            />
            <label class="style3" for="none">None</label><br/>
            </form>
            <p class="style2">Rate of Muscle Pain:</p>
            <form>
            <input 
            type='radio' 
            name="musclepain"
            value="high"
            />
           
            <label class="style3" for="high">High</label>
            <br/>
           
            <input 
            type='radio' 
            name="musclepain"
            value="medium"
            />
            <label class="style3" for="medium">Medium</label>
            <br/>
            <input 
            type='radio' 
            name="musclepain"
            value="low"
            />
            <label class="style3" for="low">Low</label>
            <br/>
            <input 
            type='radio' 
            name="musclepain"
            value="none"
            />
            <label class="style3" for="none">None</label><br/>
            </form>
            <p class="style2">Rate of Headache:</p>
            <form>
            <input 
            type='radio' 
            name="headache"
            value="high"
            />
           
            <label class="style3" for="high">High</label>
            <br/>
           
            <input 
            type='radio' 
            name="headache"
            value="medium"
            />
            <label class="style3" for="medium">Medium</label>
            <br/>
            <input 
            type='radio' 
            name="headache"
            value="low"
            />
            <label class="style3" for="low">Low</label>
            <br/>
            <input 
            type='radio' 
            name="headache"
            value="none"
            />
            <label class="style3" for="none">None</label><br/>
            <br/>
            </form>
            <div align="right">
            <button class="button button3" onClick={saveStatus}>Save Status</button></div>
            <br/>
            <br/>
        </form>
        </div>;

};

export default User;