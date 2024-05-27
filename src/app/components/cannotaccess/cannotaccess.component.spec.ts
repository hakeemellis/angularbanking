import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CannotaccessComponent } from './cannotaccess.component';

describe('CannotaccessComponent', () => {
  let component: CannotaccessComponent;
  let fixture: ComponentFixture<CannotaccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CannotaccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CannotaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
