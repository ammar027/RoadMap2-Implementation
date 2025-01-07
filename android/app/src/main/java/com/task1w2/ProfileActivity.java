package com.task1w2;
import android.app.Notification;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Bundle;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.NotificationCompat;

public class ProfileActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        boolean isLoggedIn = false; // Replace this with your actual logic for checking login
        if (!isLoggedIn) {
            Toast.makeText(this, "Please login to access the profile", Toast.LENGTH_SHORT).show();
            finish(); // Close ProfileActivity
        } else {
            sendProfileNotification();
        }
    }

    private void sendProfileNotification() {
        Notification notification = new NotificationCompat.Builder(this, "profile_notification")
                .setSmallIcon(R.drawable.ic_profile)
                .setContentTitle("Profile Accessed")
                .setContentText("You have accessed your profile.")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .build();

        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(1, notification);
    }
}
