import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUsuarioComponent } from './dialog-add-usuario.component';

describe('DialogAddUsuarioComponent', () => {
  let component: DialogAddUsuarioComponent;
  let fixture: ComponentFixture<DialogAddUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
