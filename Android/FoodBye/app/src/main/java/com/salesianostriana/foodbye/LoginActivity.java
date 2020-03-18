package com.salesianostriana.foodbye;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.models.request.RequestLogin;
import com.salesianostriana.foodbye.models.response.ResponseLogin;
import com.salesianostriana.foodbye.retrofit.IService;
import com.salesianostriana.foodbye.retrofit.ServiceGenerator;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    private IService service;
    private Button btnLogin;
    private EditText etEmail, etPassword;
    private TextView tvRegister;
    private String token = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        if(SharedPreferencesManager.getSomeStringValue("token") != null){
            Intent intentMainActivity = new Intent(LoginActivity.this, MainActivity.class);
            startActivity(intentMainActivity);
        }

        retrofitInit();
        findViews();
        events();

    }

    private void retrofitInit() {
        service = ServiceGenerator.createService(IService.class);
    }

    private void findViews() {
        btnLogin = findViewById(R.id.buttonLogin);
        etEmail = findViewById(R.id.editTextLoginEmail);
        etPassword = findViewById(R.id.editTextLoginPassword);
        tvRegister = findViewById(R.id.textViewLoginRegister);
    }

    private void events() {
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!etEmail.getText().toString().isEmpty() && !etPassword.getText().toString().isEmpty()) {

                    if (token.isEmpty()) {
                        //Llamada al servicio
                        RequestLogin req= new RequestLogin(etEmail.getText().toString(),etPassword.getText().toString());
                        Call<ResponseLogin> call = service.login(req);
                        call.enqueue(new Callback<ResponseLogin>() {
                            @Override
                            public void onResponse(Call<ResponseLogin> call, Response<ResponseLogin> response) {
                                if (response.isSuccessful()) {
                                    SharedPreferencesManager.setSomeStringValue("token", response.body().getToken());
                                    Intent intentMainActivity = new Intent(LoginActivity.this, MainActivity.class);
                                    startActivity(intentMainActivity);
                                    finish();

                                } else {
                                    Toast.makeText(LoginActivity.this, "Email y/o contraseña incorrecta", Toast.LENGTH_SHORT).show();
                                }
                            }

                            @Override
                            public void onFailure(Call<ResponseLogin> call, Throwable t) {
                                Toast.makeText(LoginActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                            }
                        });
                    } else {
                        Intent intentMainActivity = new Intent(LoginActivity.this, MainActivity.class);
                        startActivity(intentMainActivity);
                    }
                }else{
                    Toast.makeText(LoginActivity.this, "Uno de los campos vacío", Toast.LENGTH_SHORT).show();
                }
            }
        });

        tvRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intentRegister = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intentRegister);
            }
        });
    }
}
