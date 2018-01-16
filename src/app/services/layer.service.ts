import { Injectable } from '@angular/core';

@Injectable()
export class LayerService {
  private layers = [];

  constructor() {
    this.addLayer({ name: 'Layer 1', id: 21, active: true });
    this.addLayer({ name: 'Layer 2', id: 24, active: false });
  }

  public addLayer(layer: any) {
    this.layers.push(layer);
  }

  public getLayers() {
    // Return an immutable copy instead of actual list...
    return this.layers;
  }
}
