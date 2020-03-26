package com.salesianostriana.foodbye.ui.pedidos;

import android.content.Context;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.pedidos.PedidoViewModel;
import com.salesianostriana.foodbye.models.response.PedidoResponse;
import com.salesianostriana.foodbye.retrofit.IService;
import com.salesianostriana.foodbye.retrofit.ServiceGenerator;
import com.salesianostriana.foodbye.ui.mispedidos.MyPedidosListFragment;
import com.salesianostriana.foodbye.ui.mispedidos.MyPedidosRecyclerViewAdapter;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class PedidosListSinAsignarFragment extends Fragment {

    private String userId;
    private PedidoViewModel pedidoViewModel;
    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private MyPedidosListSinAsignarRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;
    private IService service;


    public PedidosListSinAsignarFragment() {
    }


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }

        userId = SharedPreferencesManager.getSomeStringValue("userId");
        pedidoViewModel = new ViewModelProvider(getActivity()).get(PedidoViewModel.class);
        service = ServiceGenerator.createServiceWithToken(IService.class);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_pedidos_list_sin_asignar_list, container, false);

        // Set the adapter
        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            RecyclerView recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            adapter = new MyPedidosListSinAsignarRecyclerViewAdapter(
                    getActivity(),
                    null,
                    pedidoViewModel);
            recyclerView.setAdapter(adapter);
        }
        return view;
    }



    @Override
    public void onDetach() {
        super.onDetach();
    }

    @Override
    public void onResume() {
        super.onResume();
        pedidoViewModel.getPedidosSinAsignar().observe(getActivity(), new Observer<List<PedidoResponse>>() {
            @Override
            public void onChanged(List<PedidoResponse> listaPedidos) {
                Collections.sort(listaPedidos, new PedidosListSinAsignarFragment.ordenPedidos());
                adapter.setData(listaPedidos);
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    class ordenPedidos implements Comparator<PedidoResponse> {
        public int compare(PedidoResponse a, PedidoResponse b) {
            return a.getTitulo().compareTo(b.getTitulo());
        }
    }
}
