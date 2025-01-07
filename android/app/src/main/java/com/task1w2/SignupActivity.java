package com.task1w2;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;

public class SignupActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        EditText name = findViewById(R.id.name);
        EditText phone = findViewById(R.id.phone);
        EditText email = findViewById(R.id.email);
        EditText password = findViewById(R.id.password);
        Button signupButton = findViewById(R.id.signupButton);

        signupButton.setOnClickListener(v -> {
            String nameText = name.getText().toString();
            String phoneText = phone.getText().toString();
            String emailText = email.getText().toString();
            String passwordText = password.getText().toString();

            if (nameText.isEmpty() || phoneText.isEmpty() || emailText.isEmpty() || passwordText.isEmpty()) {
                Toast.makeText(this, "Please fill in all fields", Toast.LENGTH_SHORT).show();
            } else {
                Toast.makeText(this, "Signup Successful", Toast.LENGTH_SHORT).show();
                // Navigate to LoginActivity or home screen
            }
        });
    }
}
