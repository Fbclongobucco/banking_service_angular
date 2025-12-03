import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferPix } from './transfer-pix';

describe('TransferPix', () => {
  let component: TransferPix;
  let fixture: ComponentFixture<TransferPix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferPix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferPix);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
