package com.salesianostriana.foodbye.data.pedidos;

import android.widget.Toast;

import androidx.lifecycle.MutableLiveData;

import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.models.request.RequestAsignarPedido;
import com.salesianostriana.foodbye.models.response.Asignacion;
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
    MutableLiveData<List<PedidoResponse>> listaPedidosSinAsignar;

    public PedidoRepository(){
        service = ServiceGenerator.createServiceWithToken(IService.class);
        pedido = new MutableLiveData<>();
        listaPedidos = new MutableLiveData<>();
        listaPedidosSinAsignar = new MutableLiveData<>();

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

    public MutableLiveData<PedidoResponse> getPedido(String pedidoId){
        Call<PedidoResponse> call = service.getPedido(pedidoId);
        call.enqueue(new Callback<PedidoResponse>() {
            @Override
            public void onResponse(Call<PedidoResponse> call, Response<PedidoResponse> response) {
                if (response.isSuccessful()) {
                    pedido.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<PedidoResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
        return pedido;
    }

    public MutableLiveData<List<PedidoResponse>> getListaSinAsignar(){
        Call<List<PedidoResponse>> call = service.getPedidosSinAsignar();
        call.enqueue(new Callback<List<PedidoResponse>>() {
            @Override
            public void onResponse(Call<List<PedidoResponse>> call, Response<List<PedidoResponse>> response) {
                if (response.isSuccessful()) {
                    listaPedidosSinAsignar.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<List<PedidoResponse>> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
        return listaPedidosSinAsignar;
    }

    public void putRecogerPedido(String pedidoId){
        Call<PedidoResponse> call = service.putPedidoRecogido(pedidoId);
        final MutableLiveData<PedidoResponse> pedidoEdit = new MutableLiveData<>();

        call.enqueue(new Callback<PedidoResponse>() {
            @Override
            public void onResponse(Call<PedidoResponse> call, Response<PedidoResponse> response) {
                if (response.isSuccessful()) {
                    pedidoEdit.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<PedidoResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void putEntregarPedido(String pedidoId){
        Call<PedidoResponse> call = service.putPedidoEntregado(pedidoId);
        final MutableLiveData<PedidoResponse> pedidoEdit = new MutableLiveData<>();

        call.enqueue(new Callback<PedidoResponse>() {
            @Override
            public void onResponse(Call<PedidoResponse> call, Response<PedidoResponse> response) {
                if (response.isSuccessful()) {
                    pedidoEdit.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<PedidoResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void putAsignarUsuarioAPedido(String pedidoId){
        String usuarioID = SharedPreferencesManager.getSomeStringValue("userId");
        PedidoResponse d= new PedidoResponse(usuarioID);
        Call<PedidoResponse> call = service.putAsignarPedido(pedidoId, d);
        final MutableLiveData<PedidoResponse> pedidoEdit = new MutableLiveData<>();
        call.enqueue(new Callback<PedidoResponse>() {
            @Override
            public void onResponse(Call<PedidoResponse> call, Response<PedidoResponse> response) {
                if (response.isSuccessful()) {
                    pedidoEdit.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error"+response.body(), Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<PedidoResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }


    public void putAbandonarPedido(String pedidoId){
        Call<PedidoResponse> call = service.putAbandonarPedido(pedidoId);
        final MutableLiveData<PedidoResponse> pedidoEdit = new MutableLiveData<>();
        call.enqueue(new Callback<PedidoResponse>() {
            @Override
            public void onResponse(Call<PedidoResponse> call, Response<PedidoResponse> response) {
                if (response.isSuccessful()) {
                    pedidoEdit.setValue(response.body());
                } else {
                    Toast.makeText(MyApp.getContext(), "Se produjo un error", Toast.LENGTH_SHORT).show();
                }
            }
            @Override
            public void onFailure(Call<PedidoResponse> call, Throwable t) {
                Toast.makeText(MyApp.getContext(), "Error en la conexión", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
