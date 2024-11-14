import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificacionesadminPage } from './notificacionesadmin.page';

describe('NotificacionesadminPage', () => {
  let component: NotificacionesadminPage;
  let fixture: ComponentFixture<NotificacionesadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
