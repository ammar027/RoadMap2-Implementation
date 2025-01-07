package com.task1w2;
import android.content.Context;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LoginModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    LoginModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "LoginModule";
    }

    @ReactMethod
    public void showLoginScreen() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            Intent intent = new Intent(currentActivity, LoginActivity.class);
            currentActivity.startActivity(intent);
        } else {
            Toast.makeText(reactContext, "Unable to open Login Screen", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void showSignupScreen() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            Intent intent = new Intent(currentActivity, SignupActivity.class);
            currentActivity.startActivity(intent);
        } else {
            Toast.makeText(reactContext, "Unable to open Signup Screen", Toast.LENGTH_SHORT).show();
        }
    }

    @ReactMethod
    public void checkLoginStatus(Promise promise) {
        SharedPreferences sharedPref = getReactApplicationContext().getSharedPreferences("UserPrefs", Context.MODE_PRIVATE);
        boolean isSignedIn = sharedPref.getBoolean("isSignedIn", false);
        Log.d("LoginModule", "Checking login status: " + isSignedIn);  // Log the status
        promise.resolve(isSignedIn);
    }

}
