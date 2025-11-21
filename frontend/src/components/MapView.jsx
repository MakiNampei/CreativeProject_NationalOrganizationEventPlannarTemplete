import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapView({ chapters }) {
  const navigate = useNavigate();

  const center = [39.8283, -98.5795]; 

  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "12px", overflow: "hidden" }}>
      <MapContainer center={center} zoom={4} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {chapters.map((ch) => (
          <Marker key={ch.id} position={[ch.lat, ch.lng]}>
            <Popup>
              <strong>{ch.schoolName}</strong>
              <br />
              {ch.city}, {ch.state}
              <br />
              <button
                style={{ marginTop: "4px", fontSize: "0.8rem" }}
                onClick={() => navigate(`/chapters/${ch.id}`)}
              >
                View chapter
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
