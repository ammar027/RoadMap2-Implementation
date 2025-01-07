package com.task1w2;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import android.os.Bundle;

public class LoginActivity extends AppCompatActivity {
    private static final String CHANNEL_ID = "profile_notification";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        // Match IDs with XML
        EditText email = findViewById(R.id.emailEditText); // Correct ID
        EditText password = findViewById(R.id.password);  // Correct ID
        Button loginButton = findViewById(R.id.loginButton); // Correct ID

        loginButton.setOnClickListener(v -> {
            String emailText = email.getText().toString();
            String passwordText = password.getText().toString();

            if (emailText.isEmpty() || passwordText.isEmpty()) {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Login Successful", Toast.LENGTH_SHORT).show();
                sendNotification(); // Trigger a notification on login
                // Navigate to ProfileActivity or home screen here
            }
        });

        // Create notification channel
        createNotificationChannel();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Profile Notifications";
            String description = "Notifications for profile actions";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void sendNotification() {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_profile)  // Add this drawable to your project
                .setContentTitle("Profile Action")
                .setContentText("You have logged in successfully!")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        notificationManager.notify(0, builder.build());
    }
}
