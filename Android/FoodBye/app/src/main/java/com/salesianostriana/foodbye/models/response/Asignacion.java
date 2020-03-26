
package com.salesianostriana.foodbye.models.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Asignacion {

    @SerializedName("fecha_asignacion")
    @Expose
    private String fechaAsignacion;
    @SerializedName("_id")
    @Expose
    private String id;

    @SerializedName("user_id")
    @Expose
    private String idUsuario;

    /**
     * No args constructor for use in serialization
     * 
     */
    public Asignacion() {
    }

    /**
     *
     * @param fechaAsignacion
     * @param id
     * @param idUsuario
     */
    public Asignacion(String fechaAsignacion, String id, String idUsuario) {
        this.fechaAsignacion = fechaAsignacion;
        this.id = id;
        this.idUsuario = idUsuario;
    }

    public String getFechaAsignacion() {
        return fechaAsignacion;
    }

    public void setFechaAsignacion(String fechaAsignacion) {
        this.fechaAsignacion = fechaAsignacion;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(String idUsuario) {
        this.idUsuario = idUsuario;
    }
}
