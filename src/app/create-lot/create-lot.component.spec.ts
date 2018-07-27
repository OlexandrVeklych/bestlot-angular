import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLotComponent } from './create-lot.component';

describe('CreateLotComponent', () => {
  let component: CreateLotComponent;
  let fixture: ComponentFixture<CreateLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
