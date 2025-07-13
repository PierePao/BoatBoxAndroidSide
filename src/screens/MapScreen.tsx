import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { LocationContext } from '../context/LocationContext';

const MapScreen = () => {
  const { location } = useContext(LocationContext);

  const generateMapHtml = (lat, lon) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Map</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          #map { 
            height: 100vh; 
            width: 100vw;
            margin: 0;
            padding: 0;
          }
          body {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${lat}, ${lon}], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          L.marker([${lat}, ${lon}]).addTo(map)
            .bindPopup('Last known location.')
            .openPopup();
        </script>
      </body>
      </html>
    `;
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Waiting for location data...</Text>
        <Text>Send an SMS with coordinates to see the map.</Text>
      </View>
    );
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: generateMapHtml(location.latitude, location.longitude) }}
      style={styles.webview}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    flex: 1,
  },
});

export default MapScreen;
