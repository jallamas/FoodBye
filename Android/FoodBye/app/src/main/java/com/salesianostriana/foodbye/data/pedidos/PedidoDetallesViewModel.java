package com.salesianostriana.foodbye.data.pedidos;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.MutableLiveData;

import com.salesianostriana.foodbye.models.response.PedidoResponse;

import java.util.List;

public class PedidoDetallesViewModel extends AndroidViewModel {

    MutableLiveData<PedidoResponse> pedido;
    PedidoRepository pedidoRepository;

    public PedidoDetallesViewModel(@NonNull Application application) {
        super(application);
        pedidoRepository = new PedidoRepository();
    }

    public MutableLiveData<PedidoResponse> getPedido (String id){
        pedido = pedidoRepository.getPedido(id);
        return pedido;
    }

    public void putPedidoRecoger (String id){
        pedidoRepository.putRecogerPedido(id);
    }

    public void putPedidoEntregar (String id){
        pedidoRepository.putEntregarPedido(id);
    }

}