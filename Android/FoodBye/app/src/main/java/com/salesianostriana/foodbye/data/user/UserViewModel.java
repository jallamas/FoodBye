package com.salesianostriana.foodbye.data.user;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.salesianostriana.foodbye.models.request.RequestEditPassword;
import com.salesianostriana.foodbye.models.request.RequestEditUser;
import com.salesianostriana.foodbye.models.response.UserResponse;

public class UserViewModel extends AndroidViewModel {

    MutableLiveData<String> idUser;
    MutableLiveData<UserResponse> user;
    UserRepository userRepository;

    public UserViewModel(@NonNull Application application) {
        super(application);
        userRepository = new UserRepository();
        this.idUser = new MutableLiveData<>();
        this.idUser.setValue(null);
    }

    public void updateUser(String userId, RequestEditUser req) {
        userRepository.updateUser(userId,req);
    }

    public MutableLiveData<UserResponse> getUserById(String userId){
        user = userRepository.getUserById(userId);
        return user;
    }

    public void updatePassword(String userId, RequestEditPassword req){
        userRepository.updatePassword(userId, req);
    }
}