import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { environment } from '../../../environments/environment';

import { tileLayer, latLng } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public mapSrc: SafeResourceUrl;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18, attribution: '...' }
      )
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  constructor(private sanitizer: DomSanitizer) {
    const key = environment.gmapsApiKey;
    const url = 'https://www.google.com/maps/embed/v1/place?q=Utrecht+dom&key=' + key;
    this.mapSrc = sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
  }

}
