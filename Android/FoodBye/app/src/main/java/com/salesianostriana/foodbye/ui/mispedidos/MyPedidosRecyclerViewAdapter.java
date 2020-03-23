package com.salesianostriana.foodbye.ui.mispedidos;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;
import com.salesianostriana.foodbye.R;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.pedidos.PedidoViewModel;
import com.salesianostriana.foodbye.models.response.PedidoResponse;

import java.util.ArrayList;
import java.util.List;

public class MyPedidosRecyclerViewAdapter extends RecyclerView.Adapter<MyPedidosRecyclerViewAdapter.ViewHolder> {

    private List<PedidoResponse> mValues;
    PedidoViewModel pedidoViewModel;
    Context context;
    RecyclerView recyclerView;
    SharedPreferencesManager sharedPreferencesManager;

    public MyPedidosRecyclerViewAdapter(Context ctx, List<PedidoResponse> items, PedidoViewModel pedidoViewModel) {
        this.context = ctx;
        this.mValues = items;
        this.pedidoViewModel = pedidoViewModel;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_pedido, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        if(mValues != null){
            holder.mItem = mValues.get(position);

            holder.tvTitle.setText(holder.mItem.getTitulo());
            holder.tvOrigen.setText(holder.mItem.getOrigen());
            holder.tvDestino.setText(holder.mItem.getDestino());

            if (holder.mItem.getRealizado()==true){
                holder.ivRealizado.setVisibility(View.GONE);
                holder.tvRealizado.setVisibility(View.GONE);
            }
        }
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


    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public PedidoResponse mItem;
        public TextView tvTitle, tvOrigen, tvDestino, tvRealizado;
        public ImageView ivMenu, ivRealizado;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            tvTitle = view.findViewById(R.id.textViewMyPedidoTitle);
            tvOrigen = view.findViewById(R.id.textViewMyPedidoOrigen);
            tvDestino = view.findViewById(R.id.textViewMyPedidoDestino);
            ivMenu = view.findViewById(R.id.imageViewPedidoMenu);
            tvRealizado = view.findViewById(R.id.textViewPendiente);
            ivRealizado = view.findViewById(R.id.imageViewPendiente);

        }
    }

    public void setList(List<PedidoResponse> list) {
        this.mValues = list;
        notifyDataSetChanged();
    }

    public void addAll(List<PedidoResponse> newList) {
        int lastIndex = mValues.size() - 1;
        mValues.addAll(newList);
        notifyItemRangeInserted(lastIndex, newList.size());
    }
}
