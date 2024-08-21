import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorCreateComponent } from './director-create.component';

describe('DirectorCreateComponent', () => {
  let component: DirectorCreateComponent;
  let fixture: ComponentFixture<DirectorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
