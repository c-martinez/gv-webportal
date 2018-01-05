import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layer-selector',
  templateUrl: './layer-selector.component.html',
  styleUrls: ['./layer-selector.component.css']
})
export class LayerSelectorComponent implements OnInit {
  public layers = [
    { name: 'Layer 1', id: 21, active: true },
    { name: 'Layer 2', id: 24, active: false }
  ];

  constructor() { }

  ngOnInit() {
  }

  public toggleLayer(layer, active: boolean) {
    console.log('Changed');
    console.log(layer);
    console.log(active);
  }

  public addLayer() {
    console.log('Trigger add layer...');
    const n = 25;
    this.layers.push({ name: 'Layer N', id: n, active: false });
  }
}
