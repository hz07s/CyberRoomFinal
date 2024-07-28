import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExtraComponent } from './admin-extra.component';

describe('AdminExtraComponent', () => {
  let component: AdminExtraComponent;
  let fixture: ComponentFixture<AdminExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
