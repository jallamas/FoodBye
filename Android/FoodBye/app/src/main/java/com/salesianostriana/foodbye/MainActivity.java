package com.salesianostriana.foodbye;

import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.CheckBox;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.salesianostriana.foodbye.common.Constantes;
import com.salesianostriana.foodbye.common.MyApp;
import com.salesianostriana.foodbye.common.SharedPreferencesManager;
import com.salesianostriana.foodbye.data.pedidos.PedidoViewModel;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

public class MainActivity extends AppCompatActivity {

    PedidoViewModel pedidoViewModel;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        BottomNavigationView navView = findViewById(R.id.nav_view);
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.navigation_pedidos, R.id.navigation_mis_pedidos, R.id.navigation_profile)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);

        pedidoViewModel = new ViewModelProvider(this)
                .get(PedidoViewModel.class);

        pedidoViewModel.getPedidoId().observe(MainActivity.this, new Observer<String>() {
            @Override
            public void onChanged(String pedidoId) {
                if(pedidoId != null) {
                    Intent i = new Intent(MainActivity.this, DetallePedidoActivity.class);
                    i.putExtra(Constantes.EXTRA_ID_PEDIDO, pedidoId);
                    startActivity(i);
                }
            }
        });


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
                logout();
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    private void logout() {
        SharedPreferencesManager.setSomeStringValue("token",null);
        Intent i = new Intent(MyApp.getContext(),LoginActivity.class);
        startActivity(i);
        finish();
    }

}
