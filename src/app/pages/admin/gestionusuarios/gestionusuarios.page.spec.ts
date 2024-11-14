import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionusuariosPage } from './gestionusuarios.page';

describe('GestionusuariosPage', () => {
  let component: GestionusuariosPage;
  let fixture: ComponentFixture<GestionusuariosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionusuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
