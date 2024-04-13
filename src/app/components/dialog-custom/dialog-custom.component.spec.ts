import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomComponent } from './dialog-custom.component';

describe('DialogCustomComponent', () => {
  let component: DialogCustomComponent;
  let fixture: ComponentFixture<DialogCustomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCustomComponent]
    });
    fixture = TestBed.createComponent(DialogCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
