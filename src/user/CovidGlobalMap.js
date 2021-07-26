import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import axios from 'axios';

import icon from 'leaflet/dist/images/human.png';
import marker from 'leaflet/dist/images/marker.png';
import redMarker from 'leaflet/dist/images/redMarker.png';
import yellowMarker from 'leaflet/dist/images/yellowMarker.png';

class CovidGlobalMap extends React.Component {

  constructor(props) {
 
    super(props);
    this.state = {
      covidData: [],
      position:[0,0],
      userIcon: L.icon({
        iconUrl:  icon,
        iconSize: 25
        }),
      marker: L.icon({
        iconUrl: marker,
        iconSize: 20
        })
    };
  }

  async componentDidMount() {
    L.Icon.Default.imagePath = "/";
  let response;

  try {
    response = await axios.get('https://corona.lmao.ninja/v2/countries');
  } catch(e) {
    console.log(`Failed to fetch countries: ${e.message}`, e);
    return;
  }

  const { data = [] } = response;

  const hasData = Array.isArray(data) && data.length > 0;
  if ( !hasData ) return;

  const geoJson = {
    type: 'FeatureCollection',
    features: data.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long: lng } = countryInfo;
      return {
        type: 'Feature',
        properties: {
         ...country,
         coordinates: [ lat, lng ]
        },
      }
    })
  }


var countryData={};

    const successfulLookup = position => {
    
        const { latitude, longitude } = position.coords;
            this.setState({
              isLoaded: true,
              position:[latitude,longitude]
            });
    
    
        }
        if (window.navigator.geolocation) {
            window.navigator.geolocation
            .getCurrentPosition(successfulLookup, console.log);
           } 

      var locations = [];

      for(var i=0;i<geoJson.features.length;i++){
        const { properties = {} } = geoJson.features[i];
        const {
          country,
          coordinates,
          updated,
          cases,
          deaths,
          recovered
        } = properties
      
        
      
        var updatedFormatted = updated;
        var mapMarker;
        if(cases>300000){
          mapMarker = L.icon({
            iconUrl: redMarker,
            iconSize: 20
            })
        }
        else if ( cases > 100000 ) {
          mapMarker = L.icon({
            iconUrl: yellowMarker,
            iconSize: 20
            })
        } else{ 
          mapMarker = L.icon({
          iconUrl: marker,
          iconSize: 20
          })
        }
        if ( updated ) {
          updatedFormatted = new Date(updated).toLocaleString();
        }
      
        countryData = {
          position:coordinates,
          country,  
          updatedFormatted,
          cases,
          mapMarker,
          deaths,
          recovered
        }
        
        locations.push(countryData);
      
      }
      this.setState({
        isLoaded: true,
        covidData: locations
      });
    };

    render(){
      L.Icon.Default.imagePath='../../public/images/' 
      const { covidData, position, userIcon} = this.state;
    return (
      <div>
        <br/>
<div><h3 class="style3">
 Global Impact of Covid-19!
  </h3></div>
  <br/>
        
        <MapContainer className="map"
             center={position}
             zoom={3} 
             scrollWheelZoom={false}
             style={{height: 600, width: "100%"}}
             fluid
        >
              <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
    <Marker position={position} icon={userIcon}  >
      <Popup>
        Your current location.
      </Popup>
    </Marker>

    {covidData.map((countryData) => (
        <Marker
          position={countryData.position}
          icon={countryData.mapMarker}
        >
          <Popup>   
          <h5>{countryData.country}</h5> 
            <strong>Confirmed: </strong>{countryData.cases} <br/>
            <strong>Deaths: </strong>{countryData.deaths} <br/>
            <strong>Recovered: </strong>{countryData.recovered} <br/>
            <strong>Last Update: </strong>{countryData.updatedFormatted} <br/>
            </Popup>
          
          
        </Marker>
      ))}

    </MapContainer>
<br/>
  <div class="container">
    <h6 class="style3"> <span class="red">Red</span> markers indicate 300K+ Covid-19 confirmed cases.
   <span class="yellow"> Yellow</span> markers indicate 100K+ Covid-19 confirmed cases.
    <span class="gray"> Gray</span> markers indicate less than 100K Covid-19 confirmed cases</h6>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
</div>

    )
    };
};
export default CovidGlobalMap;