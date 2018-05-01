import { Component, ViewChild, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { IOption } from 'ng-select';

import { DropzoneComponent } from 'ngx-dropzone-wrapper';

import { LayersService } from 'regis-layers';

import { SharedMapService } from '../../services/shared-map/shared-map.service';

import { CircleLayerCreator } from './circle-layer-creator';
import { UploadLayerCreator } from './upload-layer-creator';

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

  @ViewChild(DropzoneComponent) dropComponentRef: DropzoneComponent;

  private circleForm: FormGroup;

  public formSchema: any = {
    'type': 'object',
    'properties': {
      'layerName': {
        'type': 'string',
        'title': 'Layer name'
      }
    },
    'required': [ 'layerName' ]
  };
  public formLayout = [
    { 'type': 'flex', 'flex-flow': 'row wrap', 'items': [ 'layerName' ] }
  ];
  public formOptions = {
    addSubmit: false
  };
  public formData = {
  };

  private circleCreator: CircleLayerCreator;
  private uploadCreator: UploadLayerCreator;

  constructor(
              private layersService: LayersService,
              private sharedMapService: SharedMapService
            ) {}

  ngOnInit() {
    // FormGroup for circle data
    this.circleForm = new FormGroup({});
    this.circleCreator = new CircleLayerCreator(this.layersService, this.sharedMapService);
    this.uploadCreator = new UploadLayerCreator(this.layersService, this.dropComponentRef);
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
          this.uploadCreator.createUploadLayer();
          break;
        case this.CIRCLE:
          this.circleCreator.createCircleLayer();
          break;
      }
    } else {
      switch (this.selectedTab) {
        case this.UPLOAD:
          this.uploadCreator.clearUploader();
          break;
        case this.CIRCLE:
          this.circleCreator.hideCircleMarkers();
          break;
      }
    }
    this.hideLayerCreation();
  }

  private getOptions(): Array<IOption> {
    return this.TAB_OPTIONS.map(option => ({
        value: option.value,
        label: option.label
   }));
  }

  public tabChanged(newSelectedTab): void {
    if (newSelectedTab === this.CIRCLE) {
      this.circleCreator.showCircleMarkers();
    } else {
      this.circleCreator.hideCircleMarkers();
    }
  }

  public formDataChanges(changes) {
    if (changes['layerName']) {
      this.circleCreator.setLayerName(changes['layerName']);
      this.uploadCreator.setLayerName(changes['layerName']);
    }
  }
}
