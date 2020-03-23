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
    MutableLiveData<PedidoResponse> pedido;
    MutableLiveData<List<PedidoResponse>> listaPedidos;
    PedidoRepository pedidoRepository;

    public PedidoViewModel(@NonNull Application application) {
        super(application);
        pedidoRepository = new PedidoRepository();
        this.idUser = new MutableLiveData<>();
        this.idUser.setValue(null);
    }

    public MutableLiveData<List<PedidoResponse>> getPedidosByUser(String idUser){
        listaPedidos = pedidoRepository.getPedidosByUser(idUser);
        return listaPedidos;
    }
}