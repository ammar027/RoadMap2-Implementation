package com.task1w2;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyNativeModules extends ReactContextBaseJavaModule {

    // Constructor with correct class name and parameter spelling
    public MyNativeModules(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    // Return the name of the module
    @NonNull
    @Override
    public String getName() {
        return "LoginModule"; // Keep consistent naming conventions
    }

    // Method to show the login screen
    @ReactMethod
    public void showLoginScreen() {
        if (getCurrentActivity() != null) { // Check for null activity
            Intent intent = new Intent(getCurrentActivity(), LoginActivity.class);
            getCurrentActivity().startActivity(intent);
        }
    }

    // Method to show the signup screen
    @ReactMethod
    public void showSignupScreen() {
        if (getCurrentActivity() != null) { // Check for null activity
            Intent intent = new Intent(getCurrentActivity(), SignupActivity.class);
            getCurrentActivity().startActivity(intent);
        }
    }
}
