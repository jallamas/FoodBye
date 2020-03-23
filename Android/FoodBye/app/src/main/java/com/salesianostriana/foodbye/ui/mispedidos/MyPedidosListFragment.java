package com.salesianostriana.foodbye.ui.mispedidos;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.pedidos.PedidoViewModel;
import com.salesianostriana.foodbye.models.response.PedidoResponse;
import com.salesianostriana.foodbye.retrofit.IService;
import com.salesianostriana.foodbye.retrofit.ServiceGenerator;

import java.util.List;

public class MyPedidosListFragment extends Fragment {

    private String userId;
    private PedidoViewModel pedidoViewModel;
    private static final String ARG_COLUMN_COUNT = "column-count";
    private int mColumnCount = 1;
    private MyPedidosRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;
    private IService service;

    public MyPedidosListFragment(){
    }

    @SuppressWarnings("unused")
    public static MyPedidosListFragment newInstance(int columnCount) {
        MyPedidosListFragment fragment = new MyPedidosListFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }

        userId = SharedPreferencesManager.getSomeStringValue("userId");
        pedidoViewModel = new ViewModelProvider(getActivity()).get(PedidoViewModel.class);
        service = ServiceGenerator.createServiceWithToken(IService.class);
    }

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_mis_pedidos, container, false);

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView = (RecyclerView) view;
            if (mColumnCount <= 1) {
                recyclerView.setLayoutManager(new LinearLayoutManager(context));
            } else {
                recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
            }
            adapter = new MyPedidosRecyclerViewAdapter(
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
        pedidoViewModel.getPedidosByUser(userId).observe(getActivity(), new Observer<List<PedidoResponse>>() {
            @Override
            public void onChanged(List<PedidoResponse> listaPedidos) {
                adapter.setData(listaPedidos);
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();
    }
}
