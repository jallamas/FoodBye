
package com.salesianostriana.foodbye.models.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class ResponseRegister {

    @SerializedName("userResponse")
    @Expose
    private UserResponse userResponse;

    /**
     * No args constructor for use in serialization
     * 
     */
    public ResponseRegister() {
    }

    /**
     * 
     * @param userResponse
     */
    public ResponseRegister(UserResponse userResponse) {
        super();
        this.userResponse = userResponse;
    }

    public UserResponse getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(UserResponse userResponse) {
        this.userResponse = userResponse;
    }

}
