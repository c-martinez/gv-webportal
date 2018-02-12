import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MdlDialogService } from '@angular-mdl/core';
import { tileLayer, latLng, Layer, geoJSON, polygon, circle, layerGroup } from 'leaflet';

import { DataLayerCreatorComponent } from '../data-layer-creator/data-layer-creator.component';

import { LayersService, GeoJsonLayer, GroupLayer, ImageLayer } from 'regis-layers';

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
            ) {}

  ngOnInit() {
    this.layersService.addLayer({ name: 'CircleLayer', id: 24, type: 'circle',  active: true });
    this.layersService.addLayer({ name: 'Polygon',     id: 25, type: 'polygon', active: true });
    this.layersService.addLayer(
      new GeoJsonLayer(26, 'Provinces', true, 'http://localhost:4200/assets/provinces.geojson')
    );
    this.layersService.addLayer(
      new GroupLayer(27, 'Circles', true, 'http://localhost:4200/assets/demonecklace.json')
    );
    this.layersService.addLayer(
      new ImageLayer(28, 'Svg', true, 'http://localhost:4200/assets/testsvg.svg', [[42, -100], [40, -110]])
    );
  }

  public toggleLayer(layer, active: boolean) {
    this.layersService.setLayerVisibility(layer, active);
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
