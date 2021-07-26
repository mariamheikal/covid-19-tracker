import React from "react";
import { firestore} from "../firebase";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/human.png';
import marker from 'leaflet/dist/images/marker.png';
import redIcon from 'leaflet/dist/images/redMarker.png';
import greenIcon from 'leaflet/dist/images/green.png';

  class CovidLocalMap extends React.Component {

    constructor(props) {
 
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        lat: 0,
        long:0,
        locations:[],
        comment:'',
        icon: L.icon({
          iconUrl:  marker,
          iconSize: 1
          })
      };
    }


    async componentDidMount() {
      const user = localStorage.getItem('user')
      L.Icon.Default.imagePath = "/";


      function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; 
        var dLat = deg2rad(lat2-lat1);  
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }




      var users=[];

      //User's Current Location
      const getLoc = async() =>{
        const successfulLookup = position => {
          const { latitude, longitude } = position.coords;
            this.setState({lat: latitude});
            this.setState({long:longitude});
          }
        if (window.navigator.geolocation) {
            await window.navigator.geolocation
            .getCurrentPosition(successfulLookup, console.log);
          } 
      }

      getLoc();

      var newUser=true
      var latitudes_=[]
      var longitudes_=[]
      var latitudesUpdated=[]
      var longitudesUpdated=[]
      var usersUpdated=[]

      //Update Database with user's current location
     const updateDB = async() =>{
       var count=0;

        const usersLoc2 = await firestore.collection("usersLocations").doc("$Loc%Covid%Tracker$").get();
        const locData = usersLoc2.data()
        latitudes_=locData.latitudes
        longitudes_=locData.longitudes
        users=locData.users
        
        for (var i =0; i< latitudes_.length;i++){
          if(users[i]===user){
            latitudesUpdated.push(this.state.lat)
            longitudesUpdated.push(this.state.long)
            usersUpdated.push(user)
            newUser=false;
          }
          else{
            if(getDistanceFromLatLonInKm(latitudes_[i], longitudes_[i], this.state.lat, this.state.long)>=0.0003048){
              count+=1;
            }
            
            latitudesUpdated.push(latitudes_[i])
            longitudesUpdated.push(longitudes_[i])
            usersUpdated.push(locData.users[i])
          }
        }

        if(newUser){
          latitudesUpdated.push(this.state.lat)
          longitudesUpdated.push(this.state.long)
          usersUpdated.push(user)
        }

        if(count>0){
          this.setState({comment:"There are at least "+count+" Covid-19 Patients in your current zone. Take care, and stay safe!"})
          this.setState(
            {icon: L.icon({
            iconUrl:  redIcon,
            iconSize: 22
                          })
            })
        }
        else{
          this.setState({comment:"Your current zone is safe."})
          this.setState(
            {icon: L.icon({
            iconUrl:  greenIcon,
            iconSize: 25
                          })
            })
        }
         
        var usersLoc = await firestore.collection("usersLocations").doc("$Loc%Covid%Tracker$")
  
        usersLoc
        .set({
          latitudes: latitudesUpdated, 
          longitudes:longitudesUpdated,
          users: usersUpdated
          });
      }

      updateDB();

      var longitudes=[]
      var latitudes=[]

    const getUsersLocations = async()=>{
        const locations = await firestore.collection("usersLocations").doc("$Loc%Covid%Tracker$").get();
       
        const locData = locations.data()
          latitudes=locData.latitudes
          longitudes=locData.longitudes
          users=locData.users
          var locations_=[]
          for(var i =0; i<longitudes.length;i++){
            if(users[i]!==user){
            locations_.push([latitudes[i],longitudes[i]])
            }
          }

     
          this.setState({locations:locations_})
    };

    getUsersLocations()


    };

render(){
  
    return (
      <div>
                <br/>
<div><h3 class="style3">
 Covid-19 Patients Tracker Map
  </h3></div>
  <br/>
        <MapContainer className="map"
             center={[this.state.lat,this.state.long]}
             zoom={3} 
             scrollWheelZoom={false}
             style={{height: 600, width: "100%"}}
             fluid
        >
              <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    <Marker position={[this.state.lat,this.state.long]} icon={ this.state.icon}  >
      <Popup>
        {this.state.comment}
      </Popup>
    </Marker>


    {this.state.locations.map((location) => (
        <Marker
          position={location}
          icon={L.icon({
            iconUrl: icon,
            iconSize: 20
            })}>
        </Marker>
    ))}
    </MapContainer>
<br/>
<div>

<div class="container">
<p class="style3">This map shows the distribution of Covid-19 patients using Covid-19 Tracker around the world.</p>
    <h6 class="style3"> <span class="red">Red</span> markers indicate an unsafe zone. You maintain social distancing of minimum 20 feet to be safe from COVID-19.
   <span class="green"> Green</span> markers indicate a safe zone.
    <span class="blue"> Blue</span> markers indicate the distribution of other Covid-19 patients.</h6>
    </div>
</div>
<br/>
    <br/>
    <br/>
    <br/>
</div>
    )};
  };
export default CovidLocalMap;