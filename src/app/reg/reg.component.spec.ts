/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegComponent } from './reg.component';

describe('RegComponent', () => {
  let component: RegComponent;
  let fixture: ComponentFixture<RegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
