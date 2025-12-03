import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAccount } from './transfer-account';

describe('TransferAccount', () => {
  let component: TransferAccount;
  let fixture: ComponentFixture<TransferAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
