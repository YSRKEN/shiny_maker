import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewWindowComponent } from './preview-window.component';

describe('PreviewWindowComponent', () => {
  let component: PreviewWindowComponent;
  let fixture: ComponentFixture<PreviewWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
