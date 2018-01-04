import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterUserComponent } from './resgister-user.component';

describe('ResgisterUserComponent', () => {
  let component: ResgisterUserComponent;
  let fixture: ComponentFixture<ResgisterUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgisterUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
