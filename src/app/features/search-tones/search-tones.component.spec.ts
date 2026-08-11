import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTonesComponent } from './search-tones.component';

describe('SearchTonesComponent', () => {
  let component: SearchTonesComponent;
  let fixture: ComponentFixture<SearchTonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
