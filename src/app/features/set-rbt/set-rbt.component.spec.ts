import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRbtComponent } from './set-rbt.component';

describe('SetRbtComponent', () => {
  let component: SetRbtComponent;
  let fixture: ComponentFixture<SetRbtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetRbtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetRbtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
