import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotEditorComponent } from './lot-editor.component';

describe('LotEditorComponent', () => {
  let component: LotEditorComponent;
  let fixture: ComponentFixture<LotEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
