
package com.salesianostriana.foodbye.models.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ResponseRegister {

    @SerializedName("id")
    @Expose
    private String id;
    @SerializedName("fullname")
    @Expose
    private String fullname;
    @SerializedName("telefono")
    @Expose
    private String telefono;
    @SerializedName("email")
    @Expose
    private String email;

    /**
     * No args constructor for use in serialization
     * 
     */
    public ResponseRegister() {
    }

    /**
     * 
     * @param id
     * @param fullname
     * @param telefono
     * @param email
     */
    public ResponseRegister(String id, String fullname, String telefono, String email) {
        super();
        this.id = id;
        this.fullname = fullname;
        this.telefono = telefono;
        this.email = email;
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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
