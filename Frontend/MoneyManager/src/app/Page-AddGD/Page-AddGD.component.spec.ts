/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PageAddGDComponent } from './Page-AddGD.component';

describe('PageAddGDComponent', () => {
  let component: PageAddGDComponent;
  let fixture: ComponentFixture<PageAddGDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageAddGDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAddGDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
