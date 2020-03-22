import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarUsuarioAgregadoComponent } from './snack-bar-usuario-agregado.component';

describe('SnackBarUsuarioAgregadoComponent', () => {
  let component: SnackBarUsuarioAgregadoComponent;
  let fixture: ComponentFixture<SnackBarUsuarioAgregadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarUsuarioAgregadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarUsuarioAgregadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
