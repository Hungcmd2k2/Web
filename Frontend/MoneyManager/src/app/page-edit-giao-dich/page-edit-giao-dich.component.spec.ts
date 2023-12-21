import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditGiaoDichComponent } from './page-edit-giao-dich.component';

describe('PageEditGiaoDichComponent', () => {
  let component: PageEditGiaoDichComponent;
  let fixture: ComponentFixture<PageEditGiaoDichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageEditGiaoDichComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageEditGiaoDichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
