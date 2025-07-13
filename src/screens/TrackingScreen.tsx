import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, AppState, useColorScheme, Switch, NativeEventEmitter, NativeModules } from 'react-native';
import { LocationContext } from '../context/LocationContext';

const { SMSModule } = NativeModules;
const smsEventEmitter = new NativeEventEmitter(SMSModule);

const parseCoordinates = (messageBody: string) => {
  console.log(`Parsing message body: "${messageBody}"`);
  const regex1 = /Latitude:\s*(-?\d+\.\d+)\s*Longitude:\s*(-?\d+\.\d+)/;
  let match = messageBody.match(regex1);
  if (match && match.length >= 3) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    console.log(`Parsed coordinates (Format 1): Latitude=${lat}, Longitude=${lon}`);
    return { latitude: lat, longitude: lon };
  }

  const regex2 = /\(lat,lon\):\s*(-?\d+\.\d+),(-?\d+\.\d+)/;
  match = messageBody.match(regex2);
  if (match && match.length >= 3) {
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    console.log(`Parsed coordinates (Format 2): Latitude=${lat}, Longitude=${lon}`);
    return { latitude: lat, longitude: lon };
  }

  console.log("Could not parse coordinates from message.");
  return null;
};

const TrackingScreen = () => {
  const [latestMessage, setLatestMessage] = useState<{ sender: string; body: string; } | null>(null);
  const [status, setStatus] = useState('Tracking Paused');
  const { setLocation } = useContext(LocationContext);
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1C1C1E' : '#F2F2F7',
    flex: 1,
    padding: 20,
  };
  const textStyle = {
    color: isDarkMode ? '#FFFFFF' : '#000000',
  };

  const handleSmsReceived = useCallback((sms: { sender: string; body: string; }) => {
    const currentTime = new Date().toLocaleTimeString();
    console.log(`[${currentTime}] 📥 SMS Event Received: Processing...`);
    setLatestMessage(sms);
    const coords = parseCoordinates(sms.body);
    if (coords) {
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      setStatus(`Location updated from ${sms.sender}`);
      console.log(`[${currentTime}] ✅ STATUS: Location updated.`);
    } else {
      setStatus(`New message from ${sms.sender}, but no coordinates found.`);
      console.log(`[${currentTime}] ⚠️ STATUS: New message, no coordinates.`);
    }
  }, [setLocation]);

  const readLatestSmsFromFile = useCallback(async () => {
    try {
      console.log("Attempting to read latest SMS from file...");
      const fileContent = await SMSModule.readSmsFromFile();
      if (fileContent) {
        const receivedMessages = JSON.parse(fileContent);
        if (Array.isArray(receivedMessages) && receivedMessages.length > 0) {
          const lastMessage = receivedMessages[receivedMessages.length - 1];
          console.log('Latest message from file:', lastMessage);
          handleSmsReceived(lastMessage);
        }
      } else {
        setStatus('Awaiting first message...');
      }
    } catch (error) {
      console.error("Error reading SMS from file:", error);
      setStatus('Error reading messages.');
    }
  }, [handleSmsReceived]);

  useEffect(() => {
    const requestSmsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
        ]);
        if (
          granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('SMS permissions granted.');
          if (trackingEnabled) {
            readLatestSmsFromFile();
          }
        } else {
          console.log('SMS permissions denied.');
          setStatus('SMS permissions denied.');
        }
      } catch (err) {
        console.warn(err);
        setStatus('Permission request error.');
      }
    };

    requestSmsPermission();
  }, [trackingEnabled, readLatestSmsFromFile]);

  useEffect(() => {
    let smsReceivedSubscription: any = null;

    if (trackingEnabled) {
      setStatus('Tracking Active');
      console.log("Setting up SMS listener...");
      smsReceivedSubscription = smsEventEmitter.addListener('onSMSReceived', handleSmsReceived);
    } else {
      setStatus('Tracking Paused');
      setLatestMessage(null);
    }

    return () => {
      if (smsReceivedSubscription) {
        console.log("Cleaning up SMS listener.");
        smsReceivedSubscription.remove();
      }
    };
  }, [trackingEnabled, handleSmsReceived]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'active' && trackingEnabled) {
        console.log('App has come to the foreground, checking for latest SMS.');
        readLatestSmsFromFile();
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateSubscription.remove();
    };
  }, [trackingEnabled, readLatestSmsFromFile]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (trackingEnabled) {
      console.log('Starting periodic check for SMS every 4 seconds.');
      intervalId = setInterval(() => {
        console.log('Checking for new SMS from file...');
        readLatestSmsFromFile();
      }, 4000);
    }

    return () => {
      if (intervalId) {
        console.log('Stopping periodic check.');
        clearInterval(intervalId);
      }
    };
  }, [trackingEnabled, readLatestSmsFromFile]);

  return (
    <View style={backgroundStyle}>
      <Text style={[styles.title, textStyle]}>Tracking Status</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, textStyle]}>Tracking</Text>
        <Switch
          value={trackingEnabled}
          onValueChange={setTrackingEnabled}
        />
      </View>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, textStyle]}>{status}</Text>
      </View>

      {latestMessage && trackingEnabled && (
        <View style={styles.messageContainer}>
          <Text style={[styles.messageHeader, textStyle]}>Last Received Message:</Text>
          <Text style={textStyle}>From: {latestMessage.sender}</Text>
          <Text style={textStyle}>Message: {latestMessage.body}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 18,
  },
  statusContainer: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  messageContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  messageHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TrackingScreen;
