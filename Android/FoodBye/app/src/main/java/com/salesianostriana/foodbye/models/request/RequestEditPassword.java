
package com.salesianostriana.foodbye.models.request;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class RequestEditPassword {

    @SerializedName("password")
    @Expose
    private String password;
    @SerializedName("newpassword")
    @Expose
    private String newpassword;
    @SerializedName("newpasswordD")
    @Expose
    private String newpasswordD;

    /**
     * No args constructor for use in serialization
     * 
     */
    public RequestEditPassword() {
    }

    /**
     * 
     * @param password
     * @param newpasswordD
     * @param newpassword
     */
    public RequestEditPassword(String password, String newpassword, String newpasswordD) {
        super();
        this.password = password;
        this.newpassword = newpassword;
        this.newpasswordD = newpasswordD;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNewpassword() {
        return newpassword;
    }

    public void setNewpassword(String newpassword) {
        this.newpassword = newpassword;
    }

    public String getNewpasswordD() {
        return newpasswordD;
    }

    public void setNewpasswordD(String newpasswordD) {
        this.newpasswordD = newpasswordD;
    }

}
