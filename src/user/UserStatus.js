import React, {useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { firestore } from "../firebase";

const UserStatus = () =>{
    const [status, setStatus] = useState([]);
    const user = localStorage.getItem('user')
  
    useEffect(()=>{
        const getStatus = async() =>{
         const statusCol =  await firestore
         .collection("users")
         .doc(user)
         .collection("covid-status")
         .get();

         setStatus(statusCol.docs);

        };
        getStatus();

        if(status.length>0) 
        {
            localStorage.setItem('health-status',user)

        }


    },[status.length,user]); 
    
    function mode(arr){
        return arr.sort((a,b) =>
              arr.filter(v => v===a).length
            - arr.filter(v => v===b).length
        ).pop();
    }


    const checkDate = (date) => {
        const today = new Date().toDateString();
        const todaySplit =  today.split(" ");
        const day = date[2];
        const month=date[1];
        const year = date[3];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const daysPerMonth= [31,28,31,30,31,30,31,31,30,31,30,31];
        const offset = 14-parseInt(todaySplit[2]);
        const boundary= daysPerMonth[months.indexOf(month)]-offset;
        var prevMonth="";
        var prevYear=0;
        if(todaySplit[2]==='Jan'){
            prevMonth='Dec';
            prevYear = toString(parseInt(todaySplit[3])-1);
        }
        else{
            prevMonth=months[months.indexOf(todaySplit[2])-1];
            prevYear=year;
        }
        if(
            (parseInt(day)<parseInt(todaySplit[2]) && month===todaySplit[1] && year===todaySplit[3])
            ||
            (day===todaySplit[2] && month===todaySplit[1] && year===todaySplit[3])
            ||
            (offset>0 && parseInt(day)>boundary && month===prevMonth && year===prevYear)
            ){
                return true;
            }
        else return false;
    }

 

    const renderTemperatureStatus = () => {
        var temperatureSum=0;
        var len=0;
        status.map((s,i) => {
            const statusData = s.data();
            const date = statusData.date.split(" ");                   
            if(checkDate(date)){
            temperatureSum+=parseFloat(statusData.temperature);
            len++;
                }
        })

        var avgTemperature="";
        if(temperatureSum>0){
     avgTemperature ="Your average temprature was "+ Math.round(temperatureSum/len *10) / 10 + ' °C.';
    }
            return (
                <h4 class="style3">{avgTemperature}</h4>
              );
    };

    const renderCoughRateStatus = () => {
        var coughRateArr=[];
        status.map((s,i) => {
            const statusData = s.data();
            const date = statusData.date.split(" ");                   
            if(checkDate(date)){
            coughRateArr.push(statusData.cough);
                }
        })
        var frequentCoughRate=mode(coughRateArr)
        var frequentCoughRateTxt='';
  if (frequentCoughRate==="none"){
            frequentCoughRateTxt="On average, the rate of dry coughs you experienced is negligible."
        }
        else if(frequentCoughRate){
            frequentCoughRateTxt="The rate of dry coughs you experienced was "+frequentCoughRate+".";
        }


            return (
                <h4 class="style3">{frequentCoughRateTxt} </h4>
              );
    };

    const renderMusclePainRateStatus = () => {
        var musclepainRateArr=[];
        status.map((s,i) => {
            const statusData = s.data();
            const date = statusData.date.split(" ");                   
            if(checkDate(date)){
            musclepainRateArr.push(statusData.musclepain);
            }
        })
        var frequentMusclePainRateTxt=''
        var frequentMusclePainRate=mode(musclepainRateArr)
if (frequentMusclePainRate==="none"){
            frequentMusclePainRateTxt="On average, the rate of muscle pain you experienced is negligible."
        }
        else if(frequentMusclePainRate){
            frequentMusclePainRateTxt="The rate of muscle pain you experienced was "+frequentMusclePainRate+".";
        }
            return (
                <Switch>
                    {frequentMusclePainRate?(
                <h4 class="style3">{frequentMusclePainRateTxt}</h4>):(
                    <div class="loader"></div>
                )
               } </Switch>
              );
    };

    const renderHeadacheStatus = () => {
        var headacheRateArr=[];
        status.map((s,i)=>{
          const statusData = s.data();
            const date = statusData.date.split(" ");                   
                if(checkDate(date)){
            headacheRateArr.push(statusData.cough);
                }
        })
        var frequentHeadacheRateTxt=''
        var frequentHeadacheRate=mode(headacheRateArr)
          if (frequentHeadacheRate==="none"){
            frequentHeadacheRateTxt="On average, the rate of headaches you experienced is negligible."
        }
        else if(frequentHeadacheRate) {
            frequentHeadacheRateTxt="The rate of headache you experienced was "+frequentHeadacheRate+".";
        }

            return (
                <h4 class="style3">{frequentHeadacheRateTxt} </h4>
              );
    };




    const renderStatus = () => {
        status.map((s,i)=>{
        })
            return (
                <h3 class="style5">This is a statistical report of your health status.</h3>
              );
    };


    return( 
    
        <Switch>
        {localStorage.getItem('health-status')===user?(
        <div>
        
        <div className="user-status">
                <br/>
                <br/>
                <h1 class="style7">Health Status Report</h1><br/>
                    <ul>{renderStatus()}</ul><br/>
        
                <div class="card">
                    <div class="container">
                    <br/>
                     <ul>{renderTemperatureStatus()}</ul>
                    <ul>{renderCoughRateStatus()}</ul>
                    <ul>{renderMusclePainRateStatus()}</ul>     
                     <ul>{renderHeadacheStatus()}</ul>   
                    <br/>
                </div>
            </div>
            <br/>
            <br/>
            <p class="style3">This report uses entries during the past two week to generate statistics about your health status through this period of time. Take care, and stay safe!</p>
            <br/>
            <br/>
            <br/>
            <br/>  
         </div>
        
        </div>
        ):(
        
            <div>
        
                <br/>
                <br/>
                <br/>
                <br/>
        
        <h3 class="style7">
        Tell us some information about the Covid-19 symptoms you're experiencing, so that we can track your health status. 
        </h3>
        <br/>
                <br/>
                <br/>
        <p class="style5">Update your health status from <a class="red" href="/userstatus">here</a>.</p>
        
            </div>
            
        )
        
        }
        </Switch>
            );
        };
        
        export default UserStatus;