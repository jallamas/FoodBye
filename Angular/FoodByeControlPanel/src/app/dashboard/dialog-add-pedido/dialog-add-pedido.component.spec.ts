import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPedidoComponent } from './dialog-add-pedido.component';

describe('DialogAddPedidoComponent', () => {
  let component: DialogAddPedidoComponent;
  let fixture: ComponentFixture<DialogAddPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
