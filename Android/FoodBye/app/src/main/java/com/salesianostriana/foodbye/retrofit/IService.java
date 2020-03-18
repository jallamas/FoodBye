package com.salesianostriana.foodbye.retrofit;

import com.salesianostriana.foodbye.models.request.RequestLogin;
import com.salesianostriana.foodbye.models.response.ResponseLogin;
import com.salesianostriana.foodbye.models.response.ResponseRegister;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;

public interface IService {

    @POST("/api/login")
    Call<ResponseLogin> login(@Body RequestLogin requestLogin);

    @Multipart
    @POST("/api/register")
    Call<ResponseRegister> register(@Part MultipartBody.Part avatar,
                                    @Part("fullname") RequestBody name,
                                    @Part("email") RequestBody email,
                                    @Part("rol") RequestBody password,
                                    @Part("telefono") RequestBody telefono);
}
