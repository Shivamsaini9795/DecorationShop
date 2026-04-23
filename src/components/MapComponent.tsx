import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useRef } from "react";

const libraries: ("marker" | "places")[] = ["marker", "places"];

const containerStyle = {
  width: "100%",
  height: "300px",
};

const shopLocation = {
  lat: 26.871306,
  lng: 81.035722,
};

const MapComponent = ({ setLocation, setDistance }: any) => {

  const mapRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAY50F1G_9jxsfDe69E8kKeI_xzuZxLOK4",
    libraries
  });

  // Distance calculation
  const calculateDistance = (lat:number,lng:number) => {

    const R = 6371;

    const dLat = (lat - shopLocation.lat) * Math.PI/180;
    const dLng = (lng - shopLocation.lng) * Math.PI/180;

    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(shopLocation.lat*Math.PI/180) *
      Math.cos(lat*Math.PI/180) *
      Math.sin(dLng/2) *
      Math.sin(dLng/2);

    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    const distance = R * c;

    setDistance(distance);
  };

  // Create / update user marker
  const setUserMarker = (lat:number,lng:number) => {

    if(userMarkerRef.current){
      userMarkerRef.current.map = null;
    }

    userMarkerRef.current = new google.maps.marker.AdvancedMarkerElement({
      position:{lat,lng},
      map:mapRef.current,
      title:"Event Location"
    });

  };

  // Detect address from lat,lng
  const detectAddress = (lat:number,lng:number) => {

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({location:{lat,lng}},(results,status)=>{

    if(status==="OK" && results && results[0]){

      const address = results[0].formatted_address;

      console.log("Detected Address:", address);

      setLocation(address);

    }

  });

};

  // Map load
  const handleLoad = (map:any) => {

    mapRef.current = map;

    const storeIcon = document.createElement("img");

    storeIcon.src = "https://cdn-icons-png.flaticon.com/512/3081/3081559.png";
    storeIcon.style.width = "40px";
    storeIcon.style.height = "40px";

    new google.maps.marker.AdvancedMarkerElement({
      position: shopLocation,
      map: map,
      title: "Our Store",
      content: storeIcon
    });

  };

  // Map click
  const handleClick = (e:any) => {

  const lat = e.latLng.lat();
  const lng = e.latLng.lng();

  calculateDistance(lat,lng);
  setUserMarker(lat,lng);
  detectAddress(lat,lng);

};

  // Current location
  const getCurrentLocation = () => {

  navigator.geolocation.getCurrentPosition((pos)=>{

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    calculateDistance(lat,lng);
    setUserMarker(lat,lng);

    mapRef.current.panTo({lat,lng});

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      { location: { lat: lat, lng: lng } },
      (results, status) => {

        if(status === "OK" && results[0]){

          setLocation(results[0].formatted_address);

        }

      }
    );

  });

};
  if(!isLoaded) return <div>Loading Map...</div>;

  return(

    <>
      <button
        type="button"
        onClick={getCurrentLocation}
        className="mb-3 px-4 py-2 bg-pink-500 text-white rounded"
      >
        Use My Current Location
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={shopLocation}
        zoom={13}
        options={{ mapId:"f53f29d51ac734a930fd1208" }}
        onLoad={handleLoad}
        onClick={handleClick}
      />
    </>
  );

};

export default MapComponent;