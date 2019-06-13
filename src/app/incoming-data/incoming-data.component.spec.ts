import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingDataComponent } from './incoming-data.component';

describe('IncomingDataComponent', () => {
  let component: IncomingDataComponent;
  let fixture: ComponentFixture<IncomingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
