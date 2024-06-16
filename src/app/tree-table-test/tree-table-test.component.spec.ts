import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTableTestComponent } from './tree-table-test.component';

describe('TreeTableTestComponent', () => {
  let component: TreeTableTestComponent;
  let fixture: ComponentFixture<TreeTableTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreeTableTestComponent]
    });
    fixture = TestBed.createComponent(TreeTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
