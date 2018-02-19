import { Component, OnInit } from '@angular/core';

import { tileLayer, latLng } from 'leaflet';
import { divIcon, icon, marker, imageOverlay } from 'leaflet';

import { LayersService } from 'regis-layers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...'
      }
      )
    ],
    zoom: 5,
    center: latLng(45.00, 5.00)
  };
  public mapLayers = this.layersService.getMapLayers();

  constructor(private layersService: LayersService) {
  }

  ngOnInit() {
  }
}
