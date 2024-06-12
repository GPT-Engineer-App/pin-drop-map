import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Container, Input, Button, VStack } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapComponent = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    },
  });
  return null;
};

const Index = () => {
  const [markers, setMarkers] = useState([]);
  const [newMarkerName, setNewMarkerName] = useState("");
  const [newMarkerPosition, setNewMarkerPosition] = useState(null);

  const handleMapClick = (latlng) => {
    setNewMarkerPosition(latlng);
  };

  const handleAddMarker = () => {
    if (newMarkerName && newMarkerPosition) {
      setMarkers([...markers, { position: newMarkerPosition, name: newMarkerName }]);
      setNewMarkerName("");
      setNewMarkerPosition(null);
    }
  };

  return (
    <Container maxW="full" height="100vh" p={0}>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, idx) => (
          <Marker key={idx} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
        <MapComponent onMapClick={handleMapClick} />
      </MapContainer>
      {newMarkerPosition && (
        <VStack
          position="absolute"
          top={4}
          left={4}
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          spacing={2}
        >
          <Input
            placeholder="Enter marker name"
            value={newMarkerName}
            onChange={(e) => setNewMarkerName(e.target.value)}
          />
          <Button onClick={handleAddMarker}>Add Marker</Button>
        </VStack>
      )}
    </Container>
  );
};

export default Index;