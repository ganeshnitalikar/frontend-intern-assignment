import React, { useEffect, useState } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const LocatorMap = ({ location }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (location && location.address) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              location.address
            )}&key=${apiKey}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setCoordinates({ lat, lng });
          } else {
            console.error("No results found for the provided address.");
          }
        } catch (error) {
          console.error("Error fetching geocode data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [location, apiKey]);

  return (
    <div style={{ width: "100%", height: "300px" }}>
      {loading ? (
        <div>Loading location...</div>
      ) : coordinates ? (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={coordinates}
            zoom={14}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        </LoadScript>
      ) : (
        <div>Unable to load map for the provided address.</div>
      )}
    </div>
  );
};

export default LocatorMap;
