
package com.salesianostriana.foodbye.models.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UserResponse {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("fullname")
    @Expose
    private String fullname;
    @SerializedName("email")
    @Expose
    private String email;
    @SerializedName("rol")
    @Expose
    private String rol;
    @SerializedName("avatar")
    @Expose
    private String avatar;
    @SerializedName("validated")
    @Expose
    private Boolean validated;
    @SerializedName("phone")
    @Expose
    private String phone;

    /**
     * No args constructor for use in serialization
     * 
     */
    public UserResponse() {
    }

    /**
     * 
     * @param validated
     * @param phone
     * @param id
     * @param fullname
     * @param avatar
     * @param email
     * @param rol
     */
    public UserResponse(String id, String fullname, String email, String rol, String avatar, Boolean validated, String phone) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.rol = rol;
        this.avatar = avatar;
        this.validated = validated;
        this.phone = phone;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Boolean getValidated() {
        return validated;
    }

    public void setValidated(Boolean validated) {
        this.validated = validated;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public UserResponse(String id) {
        this.id = id;
    }
}
