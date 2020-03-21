import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarUsuarioBorradoComponent } from './snack-bar-usuario-borrado.component';

describe('SnackBarUsuarioBorradoComponent', () => {
  let component: SnackBarUsuarioBorradoComponent;
  let fixture: ComponentFixture<SnackBarUsuarioBorradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarUsuarioBorradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarUsuarioBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
