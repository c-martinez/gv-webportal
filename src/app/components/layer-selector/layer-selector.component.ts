import { Component, OnInit } from '@angular/core';

import { MdlDialogService } from '@angular-mdl/core';

import { DataLayerCreatorComponent } from '../data-layer-creator/data-layer-creator.component';

@Component({
  selector: 'app-layer-selector',
  templateUrl: './layer-selector.component.html',
  styleUrls: ['./layer-selector.component.css']
})
export class LayerSelectorComponent implements OnInit {
  public layers = [
    { name: 'Layer 1', id: 21, active: true },
    { name: 'Layer 2', id: 24, active: false }
  ];

  constructor(private dialogService: MdlDialogService) { }

  ngOnInit() {
  }

  public toggleLayer(layer, active: boolean) {
    console.log('Changed');
    console.log(layer);
    console.log(active);
  }

  public addLayer() {
    console.log('Trigger add layer...');
    const n = 25;
    this.layers.push({ name: 'Layer N', id: n, active: false });

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
