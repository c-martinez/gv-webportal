import { Injectable } from '@angular/core';

import { BaseLayer } from './baselayer';

@Injectable()
export class LayerService {
  private layers: BaseLayer[] = [];

  constructor() {
    this.addLayer({ name: 'Layer 1', id: 21, active: true  });
    this.addLayer({ name: 'Layer 2', id: 24, active: false });
  }

  public addLayer(layer: BaseLayer) {
    this.layers.push(layer);
  }

  public getLayers() {
    // Return an immutable copy instead of actual list...
    return this.layers;
  }
}
