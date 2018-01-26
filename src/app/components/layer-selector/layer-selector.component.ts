import { Component, OnInit } from '@angular/core';

import { MdlDialogService } from '@angular-mdl/core';

import { DataLayerCreatorComponent } from '../data-layer-creator/data-layer-creator.component';
import { LayerService } from '../../services/layer.service';

import { LayersService } from 'regis-layer-service';

@Component({
  selector: 'app-layer-selector',
  templateUrl: './layer-selector.component.html',
  styleUrls: ['./layer-selector.component.css'],
  providers: [LayerService, LayersService]
})
export class LayerSelectorComponent implements OnInit {
  public layers = this.layerService.getLayers();

  constructor(private dialogService: MdlDialogService,
              private layerService: LayerService,
              private layersService: LayersService
            ) { }

  ngOnInit() {
    console.log('Layers from service: ');
    console.log(this.layersService.getLayers());
  }

  public toggleLayer(layer, active: boolean) {
    console.log('Changed');
    console.log(layer);
    console.log(active);
  }

  public addLayer() {
    console.log('Trigger add layer...');
    const n = 25;
    this.layerService.addLayer({ name: 'Layer N', id: n, active: false });

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
