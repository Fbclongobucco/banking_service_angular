import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicCard } from './dinamic-card';

describe('DinamicCard', () => {
  let component: DinamicCard;
  let fixture: ComponentFixture<DinamicCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
