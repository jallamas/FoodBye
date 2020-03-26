package com.salesianostriana.foodbye.ui.profile;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.lifecycle.ViewModelProviders;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.model.GlideUrl;
import com.bumptech.glide.load.model.LazyHeaders;
import com.bumptech.glide.request.RequestOptions;
import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.Constantes;
import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.user.UserViewModel;
import com.salesianostriana.foodbye.models.request.RequestEditUser;
import com.salesianostriana.foodbye.models.response.UserResponse;

public class EditUserFragment extends Fragment {

    private String userId;
    private ImageView ivFoto;
    private EditText etFullname,etEmail,etPhone;
    private TextView tvChangePassword;
    private Button btnSaveProfile;
    private UserViewModel userViewModel;

    public static EditUserFragment newInstance(){
        return new EditUserFragment();
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        userId = SharedPreferencesManager.getSomeStringValue("userId");
        userViewModel = new ViewModelProvider(getActivity()).get(UserViewModel.class);
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {


        View v = inflater.inflate(R.layout.fragment_profile, container, false);

        ivFoto = v.findViewById(R.id.imageViewProfileFoto);
        etFullname = v.findViewById(R.id.ediTextProfileFullname);
        etEmail = v.findViewById(R.id.editTextProfileEmail);
        etPhone = v.findViewById(R.id.editTextProfilePhone);
        tvChangePassword = v.findViewById(R.id.textViewProfileChangePassword);
        btnSaveProfile = v.findViewById(R.id.buttonProfileSave);

        btnSaveProfile.setOnClickListener(view -> {
            String fullname = etFullname.getText().toString();
            String email = etEmail.getText().toString();
            String phone = etPhone.getText().toString();

            if(fullname.isEmpty()){
                etFullname.setError("El nombre es requerido");
            } else if (email.isEmpty()){
                etEmail.setError("El email es requerido");
            } else if (phone.isEmpty()){
                etPhone.setError("El teléfono es requerido");
            } else {
                RequestEditUser req = new RequestEditUser(fullname,email,phone);
                userViewModel.updateUser(userId,req);
                getActivity().onBackPressed();
            }
        });

        ivFoto.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(getActivity(), EditAvatarActivity.class);
                startActivity(i);
            }
        });

        userViewModel.getUserById(userId).observe(getActivity(), new Observer<UserResponse>() {
            @Override
            public void onChanged(UserResponse userResponse) {
                etFullname.setText(userResponse.getFullname());
                etEmail.setText(userResponse.getEmail());
                etPhone.setText(userResponse.getPhone());

                if(userResponse.getAvatar()!=null){
                    GlideUrl glideUrl = new GlideUrl(Constantes.URL_BASE + "/api/avatar/" + userResponse.getId()
                            ,new LazyHeaders.Builder()
                            .addHeader("Authorization", "Bearer " + SharedPreferencesManager.getSomeStringValue("token"))
                            .build());
                    Glide
                            .with(MyApp.getContext())
                            .load(glideUrl)
                            .apply(RequestOptions.circleCropTransform())
                            .into(ivFoto);
                } else {
                    Glide
                            .with(MyApp.getContext())
                            .load(R.drawable.ic_account_circle_white_24dp)
                            .apply(RequestOptions.circleCropTransform())
                            .into(ivFoto);
                }
            }
        });

        tvChangePassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(getActivity(), EditPasswordActivity.class);
                startActivity(i);
            }
        });

        return v;
    }
}
