package com.salesianostriana.foodbye.data.pedidos;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.salesianostriana.foodbye.models.response.PedidoResponse;

import java.util.List;

public class PedidoViewModel extends AndroidViewModel {

    MutableLiveData<String> idUser;
    MutableLiveData<List<PedidoResponse>> listaPedidos;
    MutableLiveData<List<PedidoResponse>> listaPedidosSinAsignar;
    PedidoRepository pedidoRepository;
    MutableLiveData<String> idPedido;

    public PedidoViewModel(@NonNull Application application) {
        super(application);
        pedidoRepository = new PedidoRepository();
        this.idUser = new MutableLiveData<>();
        this.idUser.setValue(null);
        this.idPedido = new MutableLiveData<>();
        this.idPedido.setValue(null);
    }

    public void setPedidoId(String id2) {
        this.idPedido.setValue(id2);
    }

    public MutableLiveData<String> getPedidoId() {
        return idPedido;
    }

    public MutableLiveData<List<PedidoResponse>> getPedidosByUser(String idUser){
        listaPedidos = pedidoRepository.getPedidosByUser(idUser);
        return listaPedidos;
    }


    public MutableLiveData<List<PedidoResponse>> getPedidosSinAsignar(){
        listaPedidosSinAsignar = pedidoRepository.getListaSinAsignar();
        return listaPedidosSinAsignar;
    }
}