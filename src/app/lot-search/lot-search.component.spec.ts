import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotSearchComponent } from './lot-search.component';

describe('LotSearchComponent', () => {
  let component: LotSearchComponent;
  let fixture: ComponentFixture<LotSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
