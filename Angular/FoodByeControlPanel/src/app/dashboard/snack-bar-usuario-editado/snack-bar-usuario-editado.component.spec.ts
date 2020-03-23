import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarUsuarioEditadoComponent } from './snack-bar-usuario-editado.component';

describe('SnackBarUsuarioEditadoComponent', () => {
  let component: SnackBarUsuarioEditadoComponent;
  let fixture: ComponentFixture<SnackBarUsuarioEditadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarUsuarioEditadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarUsuarioEditadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
