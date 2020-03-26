package com.salesianostriana.foodbye.models.request;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.salesianostriana.foodbye.models.response.Asignacion;

public class RequestAsignarPedido {

    @SerializedName("asignacion")
    @Expose
    private String asignacion;

    public RequestAsignarPedido(String asignacion) {
        this.asignacion = asignacion;
    }

    public String getAsignacion() {
        return asignacion;
    }

    public void setAsignacion(String asignacion) {
        this.asignacion = asignacion;
    }
}
