import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorListComponent } from './director-list.component';

describe('DirectorListComponent', () => {
  let component: DirectorListComponent;
  let fixture: ComponentFixture<DirectorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
