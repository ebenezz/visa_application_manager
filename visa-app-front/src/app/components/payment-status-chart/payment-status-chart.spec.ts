import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusChartComponent } from './payment-status-chart';

describe('PaymentStatusChart', () => {
  let component: PaymentStatusChartComponent;
  let fixture: ComponentFixture<PaymentStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentStatusChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
