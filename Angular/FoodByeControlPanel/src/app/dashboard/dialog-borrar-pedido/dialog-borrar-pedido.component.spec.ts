import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarPedidoComponent } from './dialog-borrar-pedido.component';

describe('DialogBorrarPedidoComponent', () => {
  let component: DialogBorrarPedidoComponent;
  let fixture: ComponentFixture<DialogBorrarPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBorrarPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBorrarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
