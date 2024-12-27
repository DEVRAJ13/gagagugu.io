import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlashCardsPage } from './flash-cards.page';

describe('FlashCardsPage', () => {
  let component: FlashCardsPage;
  let fixture: ComponentFixture<FlashCardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
