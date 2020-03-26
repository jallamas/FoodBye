package com.salesianostriana.foodbye;

import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.widget.NestedScrollView;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.salesianostriana.foodbye.common.Constantes;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.pedidos.PedidoDetallesViewModel;
import com.salesianostriana.foodbye.models.request.RequestAsignarPedido;
import com.salesianostriana.foodbye.models.response.Asignacion;
import com.salesianostriana.foodbye.models.response.PedidoResponse;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.joda.time.format.ISODateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DetallePedidoActivity extends AppCompatActivity {

    PedidoDetallesViewModel pedidoDetallesViewModel;
    Bundle bundle;
    String idUse;
    Button btnAsignar;
    TextView tvTitulo, tvOrigen, tvDestino, tvTelefono, tvDescripcion, tvHoraRecogida, tvHoraEntrega,tvRealizado;
    CheckBox cbRecogido, cbEntregado;
    ProgressBar pbLoading;
    NestedScrollView nsvContenidoDetalle;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detalle_pedido);
        initVariables();

        pedidoDetallesViewModel = new ViewModelProvider(this).get(PedidoDetallesViewModel.class);
        bundle = getIntent().getExtras();
        idUse = bundle.getString(Constantes.EXTRA_ID_PEDIDO);
        pedidoDetallesViewModel.getPedido(idUse).observe(this, new Observer<PedidoResponse>() {

            @Override
            public void onChanged(PedidoResponse pedidoResponse) {
                DateTimeFormatter fmt = DateTimeFormat.forPattern("d MMMM yyyy HH:mm:ss");

                pbLoading.setVisibility(View.GONE);
                nsvContenidoDetalle.setVisibility(View.VISIBLE);

                if(pedidoResponse.getTimeRecogido()!=null){
                    cbEntregado.setVisibility(View.VISIBLE);
                    cbRecogido.setChecked(true);
                    cbRecogido.setEnabled(false);
                    cbEntregado.setChecked(false);
                    cbEntregado.setEnabled(true);
                }else{
                    cbEntregado.setVisibility(View.GONE);
                    cbRecogido.setChecked(false);
                    cbRecogido.setEnabled(true);
                }

                if(pedidoResponse.getTimeEntregado()!=null){
                    cbEntregado.setChecked(true);
                    cbEntregado.setEnabled(false);
                }else{
                    cbEntregado.setChecked(false);
                    cbEntregado.setEnabled(true);
                }

                if(pedidoResponse.getTimeRecogido()==null){
                    tvHoraRecogida.setVisibility(View.GONE);
                    tvHoraEntrega.setVisibility(View.GONE);
                }
                else if(pedidoResponse.getTimeEntregado()==null) {
                    DateTime timeRecogido = ConvertToDate(pedidoResponse.getTimeRecogido());
                    tvHoraRecogida.setText(timeRecogido.toString(fmt));
                    tvHoraRecogida.setVisibility(View.VISIBLE);
                    tvHoraEntrega.setVisibility(View.GONE);
                }else {
                    DateTime timeRecogido = ConvertToDate(pedidoResponse.getTimeRecogido());
                    DateTime timeEntregado = ConvertToDate(pedidoResponse.getTimeEntregado());
                    tvHoraRecogida.setVisibility(View.VISIBLE);
                    tvHoraEntrega.setVisibility(View.VISIBLE);
                    tvHoraRecogida.setText(timeRecogido.toString(fmt));
                    tvHoraEntrega.setText(timeEntregado.toString(fmt));
                }
                if(pedidoResponse.getRealizado()){
                    tvRealizado.setText(R.string.text_realizado);
                }else{
                    tvRealizado.setVisibility(View.GONE);
                }


                if(pedidoResponse.getAsignacion()==null){
                    btnAsignar.setVisibility(View.VISIBLE);
                    cbRecogido.setVisibility(View.GONE);
                    btnAsignar.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                                btnAsignar.setText(R.string.text_abandonar);
                                btnAsignar.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                                pedidoDetallesViewModel.putAsignarPedidoUsuario(idUse);
                                recreate();
                            }
                        });
                }
                else if(pedidoResponse.getAsignacion()!=null && pedidoResponse.getTimeRecogido()==null){
                    btnAsignar.setVisibility(View.VISIBLE);
                    btnAsignar.setText(R.string.text_abandonar);
                    btnAsignar.setBackgroundColor(getResources().getColor(R.color.colorPrimaryDark));
                    btnAsignar.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            AlertDialog.Builder dialogoRecogido = new AlertDialog.Builder(DetallePedidoActivity.this);
                            dialogoRecogido.setMessage(R.string.mensaje_abandonar_pedido)
                                    .setTitle(R.string.titulo_abandonar_pedido);
                            dialogoRecogido.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    btnAsignar.setText(R.string.text_asignar);
                                    btnAsignar.setBackgroundColor(getResources().getColor(R.color.colorAccent));
                                    pedidoDetallesViewModel.putAbandonarPedido(idUse);
                                    recreate();
                                }
                            });
                            dialogoRecogido.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                                public void onClick(DialogInterface dialog, int id) {
                                    cbRecogido.setChecked(false);
                                    cbRecogido.setEnabled(true);
                                }
                            });
                            AlertDialog dialog = dialogoRecogido.create();
                            dialog.show();
                        }
                    });
                }
                else{
                    btnAsignar.setVisibility(View.GONE);
                }

                    tvTitulo.setText(pedidoResponse.getTitulo());
                    tvOrigen.setText(": " + pedidoResponse.getOrigen());
                    tvDestino.setText(": " + pedidoResponse.getDestino());
                    tvTelefono.setText(pedidoResponse.getClientPhone());
                    tvDescripcion.setText(pedidoResponse.getDescripcion());
            }
        });
    }

    public void onCheckboxClicked(View view) {

        if(view.getId()==cbRecogido.getId()){
            cbRecogido.setChecked(false);
            cbRecogido.setEnabled(true);
            AlertDialog.Builder dialogoRecogido = new AlertDialog.Builder(this);
            dialogoRecogido.setMessage(R.string.mensaje_pedido_recogido)
                    .setTitle(R.string.titulo_pedido_recogido);
            dialogoRecogido.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    cbRecogido.setChecked(true);
                    cbRecogido.setEnabled(false);
                    cbEntregado.setChecked(false);
                    cbEntregado.setEnabled(true);
                    cbEntregado.setVisibility(View.VISIBLE);
                    pedidoDetallesViewModel.putPedidoRecoger(idUse);

                }
            });
            dialogoRecogido.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    cbRecogido.setChecked(false);
                    cbRecogido.setEnabled(true);
                }
            });
            AlertDialog dialog = dialogoRecogido.create();
            dialog.show();
        }
        if (view.getId() == cbEntregado.getId()) {
            cbEntregado.setChecked(false);
            cbEntregado.setEnabled(true);
            AlertDialog.Builder dialogoEntregado = new AlertDialog.Builder(this);
            dialogoEntregado.setMessage(R.string.mensaje_pedido_recogido)
                    .setTitle(R.string.titulo_pedido_entregado);
            dialogoEntregado.setPositiveButton(R.string.ok, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    cbEntregado.setChecked(true);
                    cbEntregado.setEnabled(false);
                    pedidoDetallesViewModel.putPedidoEntregar(idUse);
                }
            });
            dialogoEntregado.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
                public void onClick(DialogInterface dialog, int id) {
                    cbEntregado.setChecked(false);
                    cbEntregado.setEnabled(true);
                }
            });
            AlertDialog dialog = dialogoEntregado.create();
            dialog.show();
        }
    }

    public void initVariables(){
        tvHoraRecogida = findViewById(R.id.textViewHoraRecogida);
        tvHoraEntrega = findViewById(R.id.textViewHoraEntrega);
        cbRecogido = findViewById(R.id.checkbox_recogido);
        cbEntregado = findViewById(R.id.checkbox_entregado);
        tvTitulo = findViewById(R.id.textViewTituloDetallePedido);
        tvOrigen = findViewById(R.id.textViewOrigen);
        tvDestino = findViewById(R.id.textViewDestino);
        tvTelefono = findViewById(R.id.textViewTelefono);
        tvDescripcion = findViewById(R.id.textViewDescripcion);
        pbLoading = findViewById(R.id.progressBarDatosDetallePedido);
        nsvContenidoDetalle = findViewById(R.id.contenidoDetalle);
        tvRealizado = findViewById(R.id.textViewRealizado);
        btnAsignar = findViewById(R.id.buttonAsignar);

        nsvContenidoDetalle.setVisibility(View.GONE);
        pbLoading.setVisibility(View.VISIBLE);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.toolbar_menu, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            case R.id.actionmenu_logout:
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }



    private DateTime ConvertToDate(String dateString){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        DateTime convertedDate = new DateTime();
        DateTimeFormatter fmt = ISODateTimeFormat.dateTime();
        convertedDate = fmt.parseDateTime(dateString);

        return convertedDate;
    }
}
