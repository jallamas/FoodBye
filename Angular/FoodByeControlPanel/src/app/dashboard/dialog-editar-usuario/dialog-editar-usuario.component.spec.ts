import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditarUsuarioComponent } from './dialog-editar-usuario.component';

describe('DialogEditarUsuarioComponent', () => {
  let component: DialogEditarUsuarioComponent;
  let fixture: ComponentFixture<DialogEditarUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditarUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
