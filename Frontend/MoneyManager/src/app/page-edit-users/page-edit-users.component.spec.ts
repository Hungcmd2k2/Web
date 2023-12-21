import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditUsersComponent } from './page-edit-users.component';

describe('PageEditUsersComponent', () => {
  let component: PageEditUsersComponent;
  let fixture: ComponentFixture<PageEditUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageEditUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageEditUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
