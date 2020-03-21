import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBorrarUsuarioComponent } from './dialog-borrar-usuario.component';

describe('DialogBorrarUsuarioComponent', () => {
  let component: DialogBorrarUsuarioComponent;
  let fixture: ComponentFixture<DialogBorrarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogBorrarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBorrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
