import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerMessageComponent } from './handler-message.component';

describe('HandlerMessageComponent', () => {
  let component: HandlerMessageComponent;
  let fixture: ComponentFixture<HandlerMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HandlerMessageComponent]
    });
    fixture = TestBed.createComponent(HandlerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
