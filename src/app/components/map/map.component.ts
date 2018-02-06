import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { environment } from '../../../environments/environment';

import { tileLayer, latLng, Layer, geoJSON, polygon, circle, layerGroup } from 'leaflet';

import { LayersService } from 'regis-layers';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public mapSrc: SafeResourceUrl;

  public options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...'
      }
      )
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };
  public mapLayers = this.layersService.getMapLayers();

  constructor(private sanitizer: DomSanitizer,
    private layersService: LayersService
  ) {
    const key = environment.gmapsApiKey;
    const url = 'https://www.google.com/maps/embed/v1/place?q=Utrecht+dom&key=' + key;
    this.mapSrc = sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {}
}
