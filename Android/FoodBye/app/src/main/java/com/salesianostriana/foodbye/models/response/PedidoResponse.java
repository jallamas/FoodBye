
package com.salesianostriana.foodbye.models.response;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class PedidoResponse {

    @SerializedName("realizado")
    @Expose
    private Boolean realizado;
    @SerializedName("_id")
    @Expose
    private String id;
    @SerializedName("numero_pedido")
    @Expose
    private String numeroPedido;
    @SerializedName("titulo")
    @Expose
    private String titulo;
    @SerializedName("descripcion")
    @Expose
    private String descripcion;
    @SerializedName("origen")
    @Expose
    private String origen;
    @SerializedName("destino")
    @Expose
    private String destino;
    @SerializedName("client_phone")
    @Expose
    private String clientPhone;
    @SerializedName("created_date")
    @Expose
    private String createdDate;
    @SerializedName("asignacion")
    @Expose
    private Asignacion asignacion;
    @SerializedName("__v")
    @Expose
    private Integer v;

    /**
     * No args constructor for use in serialization
     * 
     */
    public PedidoResponse() {
    }

    /**
     * 
     * @param descripcion
     * @param asignacion
     * @param createdDate
     * @param realizado
     * @param v
     * @param titulo
     * @param numeroPedido
     * @param id
     * @param origen
     * @param destino
     * @param clientPhone
     */
    public PedidoResponse(Boolean realizado, String id, String numeroPedido, String titulo, String descripcion, String origen, String destino, String clientPhone, String createdDate, Asignacion asignacion, Integer v) {
        super();
        this.realizado = realizado;
        this.id = id;
        this.numeroPedido = numeroPedido;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.origen = origen;
        this.destino = destino;
        this.clientPhone = clientPhone;
        this.createdDate = createdDate;
        this.asignacion = asignacion;
        this.v = v;
    }

    public Boolean getRealizado() {
        return realizado;
    }

    public void setRealizado(Boolean realizado) {
        this.realizado = realizado;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNumeroPedido() {
        return numeroPedido;
    }

    public void setNumeroPedido(String numeroPedido) {
        this.numeroPedido = numeroPedido;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public String getClientPhone() {
        return clientPhone;
    }

    public void setClientPhone(String clientPhone) {
        this.clientPhone = clientPhone;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public Asignacion getAsignacion() {
        return asignacion;
    }

    public void setAsignacion(Asignacion asignacion) {
        this.asignacion = asignacion;
    }

    public Integer getV() {
        return v;
    }

    public void setV(Integer v) {
        this.v = v;
    }

}
