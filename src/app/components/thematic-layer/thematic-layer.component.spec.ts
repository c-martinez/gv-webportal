import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThematicLayerComponent } from './thematic-layer.component';

describe('ThematicLayerComponent', () => {
  let component: ThematicLayerComponent;
  let fixture: ComponentFixture<ThematicLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThematicLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematicLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
