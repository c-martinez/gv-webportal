import { Component, ViewChild, OnInit, HostListener } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOption } from 'ng-select';
import { basename, extname } from 'path';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';

import { LayersService, CircleLayer } from 'regis-layers';

import { SharedMapService } from '../../services/shared-map/shared-map.service';

@Component({
  selector: 'app-data-layer-creator',
  templateUrl: './data-layer-creator.component.html',
  styleUrls: ['./data-layer-creator.component.css',
  '../../../../node_modules/dropzone/dist/min/dropzone.min.css'
]
})
export class DataLayerCreatorComponent implements OnInit {
  /** THESE SHOULD BE STATICS BUT STATIC BREAKES THEM SO PLEASE DON'T CHANGE THEM */
  private PLUS_BUTTON = 'plus-button';
  public UPLOAD = 'upload';
  public CIRCLE = 'circle';
  private TAB_OPTIONS: Array<IOption> = [
    {value: this.UPLOAD  , label: 'Upload dataset'},
    {value: this.CIRCLE  , label: 'Circular guide'}
  ];
  /** END STATICS */
  private selectedTab = this.PLUS_BUTTON;
  private tabOptions: Array<IOption> = this.getOptions();

  private centerMarker;
  private radiusMarker;

  @ViewChild(DropzoneComponent) dropComponentRef: DropzoneComponent;

  private dropConfig: DropzoneConfigInterface = {
    url: 'http://localhost:4201/layers/add/',
    maxFiles: 1,
    clickable: true,
    createImageThumbnails: false,
    autoProcessQueue: false,
    paramName: 'file',
    params: (files) => {
      let filename = files[0]['name'];
      filename = basename(filename, extname(filename));

      const mymap = {
        'name': filename,
        'type': 'geojson',
        'active': true
      };

      return mymap;
    }
  };

  private circleForm: FormGroup;

  constructor(
              private layersService: LayersService,
              private sharedMapService: SharedMapService
            ) { }

  ngOnInit() {
    // FormGroup for circle data
    this.circleForm = new FormGroup({});
  }

  public showFor(option: string) {
    return this.selectedTab === option;
  }

  public showLayerCreation(): void {
    this.selectedTab = this.UPLOAD;
  }

  public hideLayerCreation(): void {
    this.selectedTab = this.PLUS_BUTTON;
  }

  public doClose(proceed: boolean): void {
    if (proceed) {
      switch (this.selectedTab) {
        case this.UPLOAD:
          const dropzone = this.dropComponentRef.directiveRef.dropzone;
          dropzone.processQueue();
          break;
        case this.CIRCLE:
          this.createCircleLayer();
          break;
      }
    } else {
      switch (this.selectedTab) {
        case this.UPLOAD:
          const dropzone = this.dropComponentRef.directiveRef.dropzone;
          dropzone.removeAllFiles();
          break;
        case this.CIRCLE:
          this.hideCircleMarkers();
          break;
      }
    }
    this.hideLayerCreation();
  }

  public onUploadSuccess(event: any) {
    // event[0] -- Original Request
    // event[1] -- server response
    // event[2] -- ProgressEvent
    const response = event[1];
    if (response.status === 'ok') {
      this.layersService.displayLayer(response.layer);

      const dropzone = this.dropComponentRef.directiveRef.dropzone;
      dropzone.removeAllFiles();
    }
  }

  public onUploadError(event: any) {
    console.log('upload error: ');
    console.log(event);
  }

  private getOptions(): Array<IOption> {
    return this.TAB_OPTIONS.map(option => ({
        value: option.value,
        label: option.label
   }));
  }

  public tabChanged(newSelectedTab): void {
    if (newSelectedTab === this.CIRCLE) {
      this.showCircleMarkers();
    } else {
      this.hideCircleMarkers();
    }
  }

  private showCircleMarkers() {
    const theMap = this.sharedMapService.getMap();

    const center = theMap.getBounds().getCenter();
    const east = theMap.getBounds().getEast();
    const draggable = true;

    this.centerMarker = this.layersService.addMarker(center.lat, center.lng, draggable, 'center');
    this.radiusMarker = this.layersService.addMarker(center.lat, (east + center.lng) / 2, draggable, 'radius');

    this.radiusMarker.on('dragend', (e) => { this.markerMoved(e); });
    this.centerMarker.on('dragend', (e) => { this.markerMoved(e); });

    this.updateCircle(true);
  }

  private hideCircleMarkers() {
    this.layersService.removeMarker('center');  // TODO: marker names could be global constants
    this.layersService.removeMarker('radius');  // TODO: marker names could be global constants
    this.layersService.removeLayer('-1');         // TODO: layer id could be global constants
  }

  private updateCircle(first: boolean) {
    if (! first) {
      this.layersService.removeLayer('-1');
    }
    const center = this.centerMarker.getLatLng();
    const distance = center.distanceTo(this.radiusMarker.getLatLng());
    this.layersService.addLayer(new CircleLayer('-1', 'no-name', true, [ center.lat, center.lng], distance), true);
  }

  private markerMoved(e) {
    this.updateCircle(false);
  }

  private createCircleLayer() {
    // TODO: same as updateCircle (except non-virtual layer) -- reuse that code ?
    this.hideCircleMarkers();
    const center = this.centerMarker.getLatLng();
    const distance = center.distanceTo(this.radiusMarker.getLatLng());
    this.layersService.addLayer(new CircleLayer('-1', 'CircleLayer', true, [ center.lat, center.lng], distance), false);
  }
}
