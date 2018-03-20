import { Component, OnInit } from '@angular/core';

import { tileLayer, latLng } from 'leaflet';
import { divIcon, icon, marker, imageOverlay, Map } from 'leaflet';

import { LayersService } from 'regis-layers';

import { SharedMapService } from '../../services/shared-map/shared-map.service';

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

  constructor(
              private layersService: LayersService,
              private sharedMapService: SharedMapService
              ) {}

  ngOnInit() {
  }

  onMapReady(theMap: Map) {
    this.sharedMapService.registerMap(theMap);
  }
}
