import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MdlDialogService } from '@angular-mdl/core';

import { DataLayerCreatorComponent } from '../data-layer-creator/data-layer-creator.component';

import { LayersService } from 'regis-layers';

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
  }

  public toggleLayer(layer, active: boolean) {
    this.layersService.setLayerVisibility(layer, active);
  }

  public addLayer() {
    const pDialog = this.dialogService.showCustomDialog({
      component: DataLayerCreatorComponent,
      isModal: true
    });
    pDialog.subscribe( (dialogReference: any) => {
      console.log('dialog visible', dialogReference);
      dialogReference.onHide().subscribe(
        () => {
          console.log('Hide dialog...');
          this.layersService.addLayer({ name: 'CircleLayer', id: 24, type: 'circle',  active: true });
        }
      );
    });
  }
}
