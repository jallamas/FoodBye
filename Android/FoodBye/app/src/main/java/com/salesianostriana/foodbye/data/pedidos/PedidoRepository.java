package com.salesianostriana.foodbye.data.pedidos;

import android.widget.Toast;

import androidx.lifecycle.MutableLiveData;

import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.models.response.PedidoResponse;
import com.salesianostriana.foodbye.retrofit.IService;
import com.salesianostriana.foodbye.retrofit.ServiceGenerator;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PedidoRepository {

    IService service;
    MutableLiveData<PedidoResponse> pedido;
    MutableLiveData<List<PedidoResponse>> listaPedidos;

    public PedidoRepository(){
        service = ServiceGenerator.createServiceWithToken(IService.class);
        pedido = new MutableLiveData<>();
        listaPedidos = new MutableLiveData<>();
    }

    public MutableLiveData<List<PedidoResponse>> getPedidosByUser(String userId){
        Call<List<PedidoResponse>> call = service.getPedidosUsuario(userId);
        call.enqueue(new Callback<List<PedidoResponse>>() {
            @Override
            public void onResponse(Call<List<PedidoResponse>> call, Response<List<PedidoResponse>> response) {
                if (response.isSuccessful()) {
                    listaPedidos.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<List<PedidoResponse>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
        return listaPedidos;
    }
}
