package com.boatbox;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.util.Log;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.File;

public class SMSModule extends ReactContextBaseJavaModule {
    private static final String TAG = "SMSModule";
    private final ReactApplicationContext reactContext;

    public SMSModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SMSModule";
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void readSmsFromFile(Promise promise) {
        try {
            String filename = "received_sms.txt";
            File file = new File(reactContext.getFilesDir(), filename);

            if (!file.exists()) {
                promise.resolve(null);
                return;
            }

            FileInputStream fis = reactContext.openFileInput(filename);
            InputStreamReader isr = new InputStreamReader(fis);
            BufferedReader bufferedReader = new BufferedReader(isr);
            StringBuilder sb = new StringBuilder();
            String line;

            // Read the file into a single string
            while ((line = bufferedReader.readLine()) != null) {
                sb.append(line);
            }
            
            bufferedReader.close();
            isr.close();
            fis.close();
            
            // The file content is a JSON array of messages, return as string
            promise.resolve(sb.toString());
        } catch (Exception e) {
            Log.e(TAG, "Error reading SMS from file: " + e.getMessage());
            promise.reject("ERROR", e.getMessage());
        }
    }
}
