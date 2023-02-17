import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ lat, lng }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={true}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>We know where you live! And btw, you owe us!</Popup>
      </Marker>
    </MapContainer>
  );
}
