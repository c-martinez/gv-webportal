import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLayerCreatorComponent } from './data-layer-creator.component';

describe('DataLayerCreatorComponent', () => {
  let component: DataLayerCreatorComponent;
  let fixture: ComponentFixture<DataLayerCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataLayerCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLayerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
