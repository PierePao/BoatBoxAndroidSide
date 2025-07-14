import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position: [number, number] = [14.5995, 120.9842]; // Manila

export default function OpenStreetMapContainer() {
  return (
    <MapContainer center={position} zoom={13} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Manila<br />Philippines
        </Popup>
      </Marker>
    </MapContainer>
  );
}
