package com.salesianostriana.foodbye.data.user;

import android.widget.Toast;

import androidx.lifecycle.MutableLiveData;

import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.models.request.RequestEditPassword;
import com.salesianostriana.foodbye.models.request.RequestEditUser;
import com.salesianostriana.foodbye.models.response.UserResponse;
import com.salesianostriana.foodbye.retrofit.IService;
import com.salesianostriana.foodbye.retrofit.ServiceGenerator;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRepository {
    IService service;
    MutableLiveData<UserResponse> user;

    public UserRepository(){
        service = ServiceGenerator.createServiceWithToken(IService.class);
        user = new MutableLiveData<>();
    }

    public MutableLiveData<UserResponse> getUserById(String userId){
        Call<UserResponse> call = service.getUser(userId);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    user.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });

        return user;
    }

    public void updateUser(String userId, RequestEditUser req){
        Call<UserResponse> call = service.editUser(userId, req);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    user.setValue(response.body());
                    Toast.makeText(MyApp.getContext(), "Perfil editado correctamente", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void updatePassword(String userId, RequestEditPassword req){
        Call<UserResponse> call = service.editPassword(userId, req);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(MyApp.getContext(), "Contraseña cambiada correctamente", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public MutableLiveData<UserResponse> updateAvatar(String userId, MultipartBody.Part avatar, RequestBody fullname){
        Call<UserResponse> call = service.editAvatar(userId, avatar, fullname);
        call.enqueue(new Callback<UserResponse>() {
            @Override
            public void onResponse(Call<UserResponse> call, Response<UserResponse> response) {
                if (response.isSuccessful()) {
                    user.setValue(response.body());
                    Toast.makeText(MyApp.getContext(), "Avatar cambiado correctamente", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<UserResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
        return user;
    }
}
