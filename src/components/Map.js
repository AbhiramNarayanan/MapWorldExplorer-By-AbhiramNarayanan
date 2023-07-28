import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { lineString, along, destination } from '@turf/turf';
import { MapContainer, TileLayer, ImageOverlay, useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';
import 'leaflet-compass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import MapFooter from './MapFooter';

const Map = () => {
  const region = useSelector((state) => state.region);
  const [mapUrl, setMapUrl] = useState(process.env.PUBLIC_URL + '/Maps/World.jpg');

  useEffect(() => {
    switch (region?.name) {
      case 'India':
        setMapUrl(process.env.PUBLIC_URL + '/Maps/India.png');
        break;
      case 'United States':
        setMapUrl(process.env.PUBLIC_URL + '/Maps/UnitedStates.png');
        break;
      case 'United Kingdom':
        setMapUrl(process.env.PUBLIC_URL + '/Maps/UnitedKingdom.png');
        break;
      default:
        setMapUrl(process.env.PUBLIC_URL + '/Maps/World.jpg');
        break;
    }
  }, [region]);

  const line = lineString([
    [-83, 30],
    [-84, 36],
    [-78, 41],
  ]);

  const distance = 200;
  const options = { units: 'miles' };
  const pointAlongLine = along(line, distance, options);
  const pointCoordinates = pointAlongLine.geometry.coordinates;

  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const mapRef = useRef();

  function DrawControl({ onUpdate }) {
    useMapEvents({
      draw: (e) => {
        const { layerType, layer } = e;
        if (layerType === 'polyline') {
          onUpdate(layer.getLatLngs());
        }
      },
    });
    return null;
  }

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation([lat, lng]);
  };

  return (
    <div style={mapContainerStyle}>
      <MapContainer
        center={[30, -83]}
        zoom={5}
        style={{ width: '100%', height: '100%', position: 'relative' }}
        whenCreated={(map) => {
          mapRef.current = map;
          L.control.zoom({ position: 'topright' }).addTo(map);
          L.control.scale({ position: 'bottomleft' }).addTo(map);
          L.control.compass({ position: 'topright' }).addTo(map);
        }}
        onClick={handleMapClick}
      >
        <ImageOverlay
          url={mapUrl}
          bounds={[
            [85.05112877980659, -180],
            [-85.05112877980659, 180],
          ]}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'red',
            color: 'white',
            padding: '4px',
            borderRadius: '4px',
            zIndex: 2,
          }}
        >
          {`Lat: ${pointCoordinates[1]}, Lng: ${pointCoordinates[0]}`}
        </div>

        {destinationCoordinates && (
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'blue',
              color: 'white',
              padding: '4px',
              borderRadius: '4px',
              zIndex: 2,
            }}
          >
            {`Destination: Lat: ${destinationCoordinates[1]}, Lng: ${destinationCoordinates[0]}`}
          </div>
        )}

        {selectedLocation && (
          <Marker position={selectedLocation} icon={customIcon}>
            <Popup>{`Selected Location: Lat: ${selectedLocation[0]}, Lng: ${selectedLocation[1]}`}</Popup>
          </Marker>
        )}

        <DrawControl
          onUpdate={(latLngs) => {
            const lineCoordinates = latLngs.map((latLng) => [latLng.lng, latLng.lat]);
            const drawnLine = lineString(lineCoordinates);

            const pointAlongDrawnLine = along(drawnLine, distance, options);
            const pointCoordinates = pointAlongDrawnLine.geometry.coordinates;

            const bearing = 90;
            const destinationPoint = destination([pointCoordinates[0], pointCoordinates[1]], distance, bearing, options);
            const destinationCoordinates = destinationPoint.geometry.coordinates;

            setDestinationCoordinates(destinationCoordinates);

            L.polyline(lineCoordinates, { color: 'blue' }).addTo(mapRef.current);

            mapRef.current.eachLayer((layer) => {
              if (layer instanceof L.Marker) {
                mapRef.current.removeLayer(layer);
              }
            });

            L.circleMarker([pointCoordinates[1], pointCoordinates[0]], { color: 'red', radius: 5 }).addTo(mapRef.current);
          }}
        />
      </MapContainer>
      <MapFooter pointCoordinates={pointCoordinates} destinationCoordinates={destinationCoordinates} />
    </div>
  );
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const customIcon = L.divIcon({
  html: <FontAwesomeIcon icon={faMapMarkerAlt} />,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default Map;
