package com.salesianostriana.foodbye.models.request;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.salesianostriana.foodbye.models.response.Asignacion;

public class RequestAsignarPedido {

    @SerializedName("asignacion")
    @Expose
    private String id;

    public RequestAsignarPedido(String id) {
        this.id = id;
    }

    public String getAsignacion() {
        return id;
    }

    public void setAsignacion(String id) {
        this.id = id;
    }
}
