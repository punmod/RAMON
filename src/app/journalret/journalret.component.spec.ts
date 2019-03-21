import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalretComponent } from './journalret.component';

describe('JournalretComponent', () => {
  let component: JournalretComponent;
  let fixture: ComponentFixture<JournalretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
