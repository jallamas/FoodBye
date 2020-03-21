package com.salesianostriana.foodbye.retrofit;

import com.salesianostriana.foodbye.models.request.RequestEditPassword;
import com.salesianostriana.foodbye.models.request.RequestEditUser;
import com.salesianostriana.foodbye.models.request.RequestLogin;
import com.salesianostriana.foodbye.models.response.ResponseLogin;
import com.salesianostriana.foodbye.models.response.UserResponse;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;

public interface IService {

    @POST("/api/login")
    Call<ResponseLogin> login(@Body RequestLogin requestLogin);

    @Multipart
    @POST("/api/register")
    Call<UserResponse> register(@Part MultipartBody.Part avatar,
                                @Part("fullname") RequestBody fullname,
                                @Part("email") RequestBody email,
                                @Part("password") RequestBody password,
                                @Part("passwordD") RequestBody passwordD,
                                @Part("phone") RequestBody phone);

    @GET("/api/user/{id}")
    Call<UserResponse> getUser(@Path("id") String idUser);

    @PUT("/api/user/{id}")
    Call<UserResponse> editUser(@Path("id") String idUser,
                                @Body RequestEditUser requestEditUser);

    @PUT("/api/user/password/{id}")
    Call<UserResponse> editPassword(@Path("id") String idUser,
                                    @Body RequestEditPassword requestEditPassword);

    @Multipart
    @PUT("/api/avatar/{id}")
    Call<UserResponse> editAvatar(@Path("id") String idUser,
                                  @Part MultipartBody.Part avatar,
                                  @Part("fullname") RequestBody fullname);
}
