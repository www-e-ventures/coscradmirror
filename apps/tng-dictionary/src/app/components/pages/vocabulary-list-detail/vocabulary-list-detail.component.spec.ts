import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyListDetailComponent } from './vocabulary-list-detail.component';

describe('VocabularyListDetailComponent', () => {
  let component: VocabularyListDetailComponent;
  let fixture: ComponentFixture<VocabularyListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabularyListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
