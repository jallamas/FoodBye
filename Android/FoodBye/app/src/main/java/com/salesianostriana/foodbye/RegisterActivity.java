package com.salesianostriana.foodbye;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.salesianostriana.foodbye.models.response.UserResponse;
import com.salesianostriana.foodbye.retrofit.IService;
import com.salesianostriana.foodbye.retrofit.ServiceGenerator;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    private static final int READ_REQUEST_CODE = 42;
    private Button btnRegister;
    private EditText etFullname, etEmail, etTelefono, etPassword1, etPassword2;
    private ImageButton ibFoto;
    private Uri uriSelected;
    private IService service;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        retrofitInit();
        findViews();
        events();
    }

    private void findViews() {
        btnRegister = findViewById(R.id.buttonRegister);
        etFullname = findViewById(R.id.editTextRegisterFullname);
        etEmail = findViewById(R.id.editTextRegisterEmail);
        etTelefono = findViewById(R.id.editTextRegisterTelefono);
        etPassword1 = findViewById(R.id.editTextRegisterPassword1);
        etPassword2 = findViewById(R.id.editTextRegisterPassword2);
        ibFoto = findViewById(R.id.imageButtonRegisterFoto);
    }

    private void retrofitInit() {
        service = ServiceGenerator.createService(IService.class);
    }

    private void events() {

        ibFoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                performFileSearch();
            }
        });

        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(etPassword2.getText().toString().equalsIgnoreCase(etPassword1.getText().toString()) && etPassword1.getText().toString().length() > 6) {
                    if (uriSelected != null) {

                        try {
                            InputStream inputStream = getContentResolver().openInputStream(uriSelected);
                            ByteArrayOutputStream baos = new ByteArrayOutputStream();
                            BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);
                            int cantBytes;
                            byte[] buffer = new byte[1024 * 4];

                            while ((cantBytes = bufferedInputStream.read(buffer, 0, 1024 * 4)) != -1) {
                                baos.write(buffer, 0, cantBytes);
                            }

                            RequestBody requestFile =
                                    RequestBody.create(
                                            baos.toByteArray(), MediaType.parse(getContentResolver().getType(uriSelected)));

                            MultipartBody.Part avatar =
                                    MultipartBody.Part.createFormData("avatar", "avatar", requestFile);

                            RequestBody fullname = RequestBody.create(etFullname.getText().toString(), MultipartBody.FORM);
                            RequestBody email = RequestBody.create(etEmail.getText().toString(), MultipartBody.FORM);
                            RequestBody phone = RequestBody.create(etTelefono.getText().toString(), MultipartBody.FORM);
                            RequestBody password = RequestBody.create(etPassword1.getText().toString(), MultipartBody.FORM);
                            RequestBody passwordD = RequestBody.create(etPassword2.getText().toString(), MultipartBody.FORM);

                            Call<UserResponse> callRegister = service.register(avatar, fullname, email, password, passwordD, phone);

                            callRegister.enqueue(new Callback<UserResponse>() {
                                @Override
                                public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                                    if (response.isSuccessful()) {
                                        Toast.makeText(RegisterActivity.this, "Usuario registrado", Toast.LENGTH_SHORT).show();
                                        Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                                        startActivity(intent);
                                    } else {
                                        Log.e("Upload error", response.errorBody().toString());
                                    }
                                }
                                @Override
                                public void onFailure(Call<UserResponse> call, Throwable t) {
                                    Toast.makeText(RegisterActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                                }
                            });
                        } catch (FileNotFoundException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }else if(uriSelected == null) {

                        RequestBody fullname = RequestBody.create(etFullname.getText().toString(), MultipartBody.FORM);
                        RequestBody email = RequestBody.create(etEmail.getText().toString(), MultipartBody.FORM);
                        RequestBody phone = RequestBody.create(etTelefono.getText().toString(), MultipartBody.FORM);
                        RequestBody password = RequestBody.create(etPassword1.getText().toString(), MultipartBody.FORM);
                        RequestBody passwordD = RequestBody.create(etPassword2.getText().toString(), MultipartBody.FORM);

                        Call<UserResponse> registerWithOutUri = service.register(null, fullname, email, password, passwordD, phone);
                        registerWithOutUri.enqueue(new Callback<UserResponse>() {
                            @Override
                            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                                if(response.isSuccessful()){
                                    Toast.makeText(RegisterActivity.this, "Registrado correctamente", Toast.LENGTH_SHORT).show();
                                    onBackPressed();
                                }
                            }
                            @Override
                            public void onFailure(Call<UserResponse> call, Throwable t) {
                                Toast.makeText(RegisterActivity.this, "Error de conexión", Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                }else{
                    Toast.makeText(RegisterActivity.this, "Contraseñas no coinciden o es demasiado corta", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    public void performFileSearch(){
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("image/*");
        startActivityForResult(intent, READ_REQUEST_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == READ_REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            Uri uri = null;
            if (data != null) {
                uri = data.getData();
                Glide
                        .with(this)
                        .load(uri)
                        .apply(RequestOptions.circleCropTransform())
                        .into(ibFoto);
                uriSelected = uri;
                ibFoto.setEnabled(true);
            }
        }
    }
}
