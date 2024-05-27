import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtransferComponent } from './etransfer.component';

describe('EtransferComponent', () => {
  let component: EtransferComponent;
  let fixture: ComponentFixture<EtransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
