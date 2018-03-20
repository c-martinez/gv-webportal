import { Component } from '@angular/core';

import { LayersService } from 'regis-layers';

@Component({
  selector: 'app-layer-selector',
  templateUrl: './layer-selector.component.html',
  styleUrls: ['./layer-selector.component.css']
})
export class LayerSelectorComponent {
  public layers = this.layersService.getLayers();

  constructor(
              private layersService: LayersService
            ) {}

  public toggleLayer(layer, active: boolean) {
    this.layersService.setLayerVisibility(layer, active);
  }

  public addLayer() {
    console.log('Do add layer logic...');
  }
}
