/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TrackingScreen from './src/screens/TrackingScreen';
import MapScreen from './src/screens/MapScreen';
import { LocationProvider } from './src/context/LocationContext';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <LocationProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Tracking" component={TrackingScreen} />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
}

export default App;
