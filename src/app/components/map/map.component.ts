import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  public mapSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const key = environment.gmapsApiKey;
    const url = 'https://www.google.com/maps/embed/v1/place?q=Utrecht+dom&key=' + key;
    this.mapSrc = sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
  }

}
