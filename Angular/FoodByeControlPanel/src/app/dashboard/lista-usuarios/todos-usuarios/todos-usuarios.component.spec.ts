import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosUsuariosComponent } from './todos-usuarios.component';

describe('TodosUsuariosComponent', () => {
  let component: TodosUsuariosComponent;
  let fixture: ComponentFixture<TodosUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
