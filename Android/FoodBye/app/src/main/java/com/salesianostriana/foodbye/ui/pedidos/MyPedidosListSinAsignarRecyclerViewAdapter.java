package com.salesianostriana.foodbye.ui.pedidos;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.pedidos.PedidoViewModel;
import com.salesianostriana.foodbye.models.response.PedidoResponse;


import java.util.ArrayList;
import java.util.List;

public class MyPedidosListSinAsignarRecyclerViewAdapter extends RecyclerView.Adapter<MyPedidosListSinAsignarRecyclerViewAdapter.ViewHolder> {

    private List<PedidoResponse> mValues;
    PedidoViewModel pedidoViewModel;
    Context context;
    RecyclerView recyclerView;
    SharedPreferencesManager sharedPreferencesManager;

    public MyPedidosListSinAsignarRecyclerViewAdapter(Context ctx, List<PedidoResponse> items, PedidoViewModel pedidoViewModel) {
        this.context = ctx;
        this.mValues = items;
        this.pedidoViewModel = pedidoViewModel;
    }

    public void setData(List<PedidoResponse> list){
        if(this.mValues != null) {
            this.mValues.clear();
        } else {
            this.mValues =  new ArrayList<>();
        }
        this.mValues.addAll(list);
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        if(mValues != null){
            return mValues.size();
        } else {
            return 0;
        }
    }


    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_pedidos_list_sin_asignar, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.tvDestino.setText(holder.mItem.getDestino());
        holder.tvOrigen.setText(holder.mItem.getOrigen());
        holder.tvTitulo.setText(holder.mItem.getTitulo());
        holder.tvNumPedido.setText(holder.mItem.getNumeroPedido());

        holder.mView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (pedidoViewModel != null) {
                    pedidoViewModel.setPedidoId(holder.mItem.getId());
                }
            }
        });

    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView tvTitulo, tvOrigen, tvDestino, tvNumPedido;
        public PedidoResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvDestino = view.findViewById(R.id.textViewDestinoPedidoSinAsignar);
            tvOrigen = view.findViewById(R.id.textViewOrigenPedidoSinAsignar);
            tvTitulo = view.findViewById(R.id.textViewTiTuloPedidoSInAsignar);
            tvNumPedido = view.findViewById(R.id.textViewNumPedidoSinAsignar);

        }

    }
}
