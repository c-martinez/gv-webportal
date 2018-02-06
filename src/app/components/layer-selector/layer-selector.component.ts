import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MdlDialogService } from '@angular-mdl/core';
import { tileLayer, latLng, Layer, geoJSON, polygon, circle, layerGroup } from 'leaflet';

import { DataLayerCreatorComponent } from '../data-layer-creator/data-layer-creator.component';

import { LayersService, GeoJsonLayer } from 'regis-layers';

@Component({
  selector: 'app-layer-selector',
  templateUrl: './layer-selector.component.html',
  styleUrls: ['./layer-selector.component.css']
})
export class LayerSelectorComponent implements OnInit {
  public layers = this.layersService.getLayers();

  constructor(private dialogService: MdlDialogService,
              private http: HttpClient,
              private layersService: LayersService
            ) {
      /*
      circle1 = circle([46.8, -121.85], { radius: 100 });
      circle2 = circle([46.92, -121.92], { radius: 100 })
      polygon([[46.8, -121.85], [46.92, -121.92], [46.87, -121.8]]),
      layerGroup([this.circle1, this.circle2]),
      geoJSON(
        ({
          type: 'Polygon',
          coordinates: [
            [
              [-121.6, 46.87],
              [-121.5, 46.87],
              [-121.5, 46.93],
              [-121.6, 46.87]
            ]]
        }) as any,
        { style: () => ({ color: '#ff7800' }) }
      )*/
  }

  ngOnInit() {
    this.layersService.addLayer({ name: 'CircleLayer', id: 24, type: 'circle',  active: true });
    this.layersService.addLayer({ name: 'Polygon',     id: 25, type: 'polygon', active: true });
    this.layersService.addLayer(
      new GeoJsonLayer(25, 'Layer N', true, 'http://localhost:4200/assets/provinces.geojson')
    );
  }

  public toggleLayer(layer, active: boolean) {
    console.log('Changed');
    console.log(layer);
    console.log(active);
    if (active) {
      console.log('We should be showing the layer...');
      console.log(layer);
    }
  }

  public addLayer() {
    console.log('Trigger add layer...');



    /*const result = this.dialogService.confirm('Would you like a mug of coffee?', 'No', 'Yes');
    // if you need both answers
    result.subscribe( () => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );*/

    this.dialogService.showCustomDialog({
      component: DataLayerCreatorComponent,
      isModal: true
      // styles: {'width': '300px'}
    });
  }

  public debug() {
    const result = this.dialogService.confirm('This is a different dialog...', 'No', 'Yes');
    // if you need both answers
    result.subscribe( () => {
        console.log('confirmed');
      },
      (err: any) => {
        console.log('declined');
      }
    );
  }
}
