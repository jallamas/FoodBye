package com.salesianostriana.foodbye.ui.profile;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.model.GlideUrl;
import com.bumptech.glide.load.model.LazyHeaders;
import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.Constantes;
import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.user.UserViewModel;
import com.salesianostriana.foodbye.models.request.RequestEditPassword;
import com.salesianostriana.foodbye.models.response.UserResponse;

public class EditPasswordActivity extends AppCompatActivity {

    private String userId;
    private ImageView ivFoto;
    private EditText etPassword,etNewPassword1,etNewPassword2;
    private Button btnSave;
    private UserViewModel userViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_password);

        userId = SharedPreferencesManager.getSomeStringValue("userId");
        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);

        ivFoto = findViewById(R.id.imageViewProfileFoto);
        etPassword = findViewById(R.id.editTextProfilePassword);
        etNewPassword1 = findViewById(R.id.editTextProfileNewPassword1);
        etNewPassword2 = findViewById(R.id.editTextProfileNewPassword2);
        btnSave = findViewById(R.id.buttonProfileChangePassword);

        btnSave.setOnClickListener(view -> {
            String password = etPassword.getText().toString();
            String newpassword = etNewPassword1.getText().toString();
            String newpasswordD = etNewPassword2.getText().toString();

            if(password.isEmpty()){
                etPassword.setError("La contraseña actual es requerida");
            } else if (newpassword.isEmpty()){
                etNewPassword1.setError("La nueva contraseña es requerida");
            } else if (newpasswordD.isEmpty()){
                etNewPassword2.setError("Introduce la nueva contraseña otra vez");
            } else {
                    RequestEditPassword req = new RequestEditPassword(password, newpassword, newpasswordD);
                    userViewModel.updatePassword(userId,req);
                    onBackPressed();
            }
        });

        userViewModel.getUserById(userId).observe(this, new Observer<UserResponse>() {
            @Override
            public void onChanged(UserResponse userResponse) {
                if(userResponse.getAvatar()!=null){
                    GlideUrl glideUrl = new GlideUrl(Constantes.URL_BASE + "/api/avatar/" + userResponse.getId()
                            ,new LazyHeaders.Builder()
                            .addHeader("Authorization", "Bearer " + SharedPreferencesManager.getSomeStringValue("token"))
                            .build());
                    Glide
                            .with(MyApp.getContext())
                            .load(glideUrl)
                            .into(ivFoto);
                } else {
                    Glide
                            .with(MyApp.getContext())
                            .load(getDrawable(R.drawable.ic_account_circle_white_24dp))
                            .into(ivFoto);
                }
            }
        });
    }
}
