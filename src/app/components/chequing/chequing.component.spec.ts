import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequingComponent } from './chequing.component';

describe('ChequingComponent', () => {
  let component: ChequingComponent;
  let fixture: ComponentFixture<ChequingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChequingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChequingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
