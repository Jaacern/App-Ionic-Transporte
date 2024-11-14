import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarConductorPage } from './buscar-conductor.page';

describe('BuscarConductorPage', () => {
  let component: BuscarConductorPage;
  let fixture: ComponentFixture<BuscarConductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
