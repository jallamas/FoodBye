package com.salesianostriana.foodbye.ui.profile;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.model.GlideUrl;
import com.bumptech.glide.load.model.LazyHeaders;
import com.bumptech.glide.request.RequestOptions;
import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.Constantes;
import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.user.UserViewModel;
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

public class EditAvatarActivity extends AppCompatActivity {

    private static final int READ_REQUEST_CODE = 42;
    private String userId, name;
    private ImageView ivNewFoto;
    private ImageButton ibNewFoto;
    private Button btnSaveAvatar;
    private UserViewModel userViewModel;
    private Uri uriSelected;
    private IService service;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_avatar);

        userId = SharedPreferencesManager.getSomeStringValue("userId");
        userViewModel = new ViewModelProvider(this).get(UserViewModel.class);

        service = ServiceGenerator.createServiceWithToken(IService.class);

        ivNewFoto = findViewById(R.id.imageViewProfileFoto2);
        ibNewFoto = findViewById(R.id.imageButtonProfileChangeAvatar);
        btnSaveAvatar = findViewById(R.id.buttonSaveNewAvatar);

        ibNewFoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                performFileSearch();
            }
        });

        btnSaveAvatar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
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

                        RequestBody fullname = RequestBody.create(SharedPreferencesManager.getSomeStringValue("fullname"), MultipartBody.FORM);

                        userViewModel.updateAvatar(userId,avatar,fullname);
                        finish();

                    }catch (FileNotFoundException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }else if(uriSelected == null) {
                    onBackPressed();
                }
            }
        });

        userViewModel.getUserById(userId).observe(this, new Observer<UserResponse>() {
            @Override
            public void onChanged(UserResponse userResponse) {
                SharedPreferencesManager.setSomeStringValue("fullname", userResponse.getFullname());
                if(userResponse.getAvatar()!=null){
                    GlideUrl glideUrl = new GlideUrl(Constantes.URL_BASE + "/api/avatar/" + userResponse.getId()
                            ,new LazyHeaders.Builder()
                            .addHeader("Authorization", "Bearer " + SharedPreferencesManager.getSomeStringValue("token"))
                            .build());
                    Glide
                            .with(MyApp.getContext())
                            .load(glideUrl)
                            .into(ivNewFoto);
                } else {
                    Glide
                            .with(MyApp.getContext())
                            .load(getDrawable(R.drawable.ic_account_circle_white_24dp))
                            .into(ivNewFoto);
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
                        .into(ibNewFoto);
                uriSelected = uri;
                ibNewFoto.setEnabled(true);
            }
        }
    }
}
