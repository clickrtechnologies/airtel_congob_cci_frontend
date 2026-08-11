import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkActivationComponent } from './bulk-activation.component';

describe('BulkActivationComponent', () => {
  let component: BulkActivationComponent;
  let fixture: ComponentFixture<BulkActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkActivationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
