package com.boatbox;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;
import android.util.Log;
import android.telephony.SubscriptionManager;
import android.telephony.SubscriptionInfo;
import java.util.List;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.BufferedReader;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;

public class SMSReceiver extends BroadcastReceiver {
    // No constructor needed for broadcast receivers registered in the manifest
    private static final String TAG = "SMSReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(TAG, "SMS received");
        
        // Get the action to verify it's an SMS_RECEIVED intent
        String action = intent.getAction();
        if (action != null && action.equals("android.provider.Telephony.SMS_RECEIVED")) {
            // Get the SMS message
            final Bundle bundle = intent.getExtras();
            try {
                if (bundle != null) {
                    // For dual SIM, get the subscription ID
                    int subId = bundle.getInt("subscription", -1);
                    logSimInfo(context, subId);

                    String format = bundle.getString("format");
                    final Object[] pdusObj = (Object[]) bundle.get("pdus");
                    if (pdusObj != null) {
                        for (Object aPdusObj : pdusObj) {
                            SmsMessage currentMessage;
                            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
                                // For modern Android versions
                                currentMessage = SmsMessage.createFromPdu((byte[]) aPdusObj, format);
                            } else {
                                // For older Android versions
                                currentMessage = SmsMessage.createFromPdu((byte[]) aPdusObj);
                            }
                            
                            String senderNum = currentMessage.getDisplayOriginatingAddress();
                            String message = currentMessage.getDisplayMessageBody();
                            
                            Log.d(TAG, "SMS Received - From: " + senderNum + ", Message: " + message);
                            
                            // Save the SMS details to a file and send event
                            saveReceivedSms(context, senderNum, message, Long.toString(currentMessage.getTimestampMillis()));
                            sendEventToReactNative(context, senderNum, message);
                        }
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Exception: " + e.getMessage());
            }
        } else {
            Log.d(TAG, "Received intent with action: " + action);
        }
    }

    private void logSimInfo(Context context, int subId) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.LOLLIPOP_MR1) {
            SubscriptionManager subscriptionManager = SubscriptionManager.from(context);
            try {
                List<SubscriptionInfo> subscriptionInfoList = subscriptionManager.getActiveSubscriptionInfoList();
                if (subscriptionInfoList != null) {
                    for (SubscriptionInfo info : subscriptionInfoList) {
                        Log.d(TAG, "SIM Info: " + info.toString());
                        if (info.getSubscriptionId() == subId) {
                            Log.d(TAG, "SMS received on SIM: " + info.getDisplayName() + " (Slot " + info.getSimSlotIndex() + ")");
                        }
                    }
                }
            } catch (SecurityException e) {
                Log.e(TAG, "SecurityException while getting SIM info: " + e.getMessage());
            }
        }
    }

    private void saveReceivedSms(Context context, String sender, String message, String timestamp) {
        String filename = "received_sms.txt";
        try {
            org.json.JSONArray jsonArray;
            File file = new File(context.getFilesDir(), filename);

            // If file exists and has content, read it. Otherwise, create a new array.
            if (file.exists() && file.length() > 0) {
                FileInputStream fis = context.openFileInput(filename);
                InputStreamReader isr = new InputStreamReader(fis);
                BufferedReader bufferedReader = new BufferedReader(isr);
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = bufferedReader.readLine()) != null) {
                    sb.append(line);
                }
                fis.close();
                jsonArray = new org.json.JSONArray(sb.toString());
            } else {
                jsonArray = new org.json.JSONArray();
            }

            // Create a JSON object for the new message
            org.json.JSONObject smsJson = new org.json.JSONObject();
            smsJson.put("sender", sender);
            smsJson.put("body", message); // Use "body" to be consistent with JS side
            smsJson.put("date", timestamp);

            // Add the new message to the array
            jsonArray.put(smsJson);

            // Overwrite the file with the updated JSON array
            java.io.FileOutputStream fos = context.openFileOutput(filename, Context.MODE_PRIVATE);
            fos.write(jsonArray.toString().getBytes());
            fos.close();
            Log.d(TAG, "Saved SMS to " + filename);

        } catch (Exception e) {
            Log.e(TAG, "Error saving SMS to file: " + e.getMessage());
        }
    }

    private void sendEventToReactNative(Context context, String sender, String body) {
        ReactInstanceManager reactInstanceManager = ((MainApplication) context.getApplicationContext()).getReactNativeHost().getReactInstanceManager();
        ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

        if (reactContext != null) {
            WritableMap params = Arguments.createMap();
            params.putString("sender", sender);
            params.putString("body", body);
            
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onSMSReceived", params);
            Log.d(TAG, "Sent event to React Native");
        } else {
            Log.d(TAG, "ReactContext is null, cannot send event.");
        }
    }
}
