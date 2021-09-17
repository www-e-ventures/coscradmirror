import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyListIndexComponent } from './vocabulary-list-index.component';

describe('VocabularyListIndexComponent', () => {
  let component: VocabularyListIndexComponent;
  let fixture: ComponentFixture<VocabularyListIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VocabularyListIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyListIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
