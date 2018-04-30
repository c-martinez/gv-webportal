import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

import { LayersService } from 'regis-layers';
import { ComputeService } from '../../services/compute/compute.service';

@Component({
  selector: 'app-thematic-layer',
  templateUrl: './thematic-layer.component.html',
  styleUrls: [
    './thematic-layer.component.css'
  ]
})
export class ThematicLayerComponent implements OnInit {
  private static NECKLACE_ALGORITHM = 'algo-necklace';
  private static NECKLACE_DATA = 'necklace-data';

  public formSchema: any = {
    'type': 'object',
    'properties': {
      'algorithm': {
        'title': 'Algorithm',
        'type': 'string',
        'oneOf':  [
          { 'title': 'Necklace Map', 'const': ThematicLayerComponent.NECKLACE_ALGORITHM },
          { 'title': 'Other things', 'const': 'algo-other' }
        ]
      },
      'necklace-data': {
        'title': 'Data layer',
        'type': 'string'
      },
      'necklace-data-column': {
        'title': 'Column in data layer',
        'type': 'string'
      },
      'necklace-guide': {
        'title': 'Guide layer',
        'type': 'string'
      }
    },
    'required': [
      'algorithm'
    ]
  };
  public formLayout = [
    {
      'widget': 'message',
      'message': '<b>Thematic layers</b>'
    },
    'algorithm',
    {
      'widget': 'message',
      'message': '<b>Algorithm parameters</b>'
    },
    {
      'key': ThematicLayerComponent.NECKLACE_DATA,
      'condition': this.showForNecklace
    },
    {
      'key': 'necklace-data-column',
      'condition': this.showForNecklaceDataColumn
    },
    {
      'key': 'necklace-guide',
      'condition': this.showForNecklace
    }
  ];
  public formData = {
  };
  public knownValues = {};

  constructor(
    private layersService: LayersService,
    private computeService: ComputeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.layersService.changeEmitter.subscribe(
      layers => this.setNecklaceLayers(layers)
    );
  }

  private showForNecklace(data): boolean {
    return data.algorithm === ThematicLayerComponent.NECKLACE_ALGORITHM;
  }

  private showForNecklaceDataColumn(data): boolean {
    return data.algorithm === ThematicLayerComponent.NECKLACE_ALGORITHM &&
      data[ThematicLayerComponent.NECKLACE_DATA];
  }

  private setNecklaceLayers(layers) {
    this.setNecklaceDataLayers(layers);
    this.setNecklaceGuideLayers(layers);
    this.triggerSchemaUpdate();
  }

  /**
   * Update necklace map data layers.
   * @param layers Layers from LayersService
   */
  private setNecklaceDataLayers(layers) {
    // Use only layers of type geojson
    layers = layers.filter(layer => layer.type === 'geojson');
    const dataLayers = layers.map(layer => {
      return {
        title: layer.name,
        const: layer.id
      };
    });
    this.formSchema['properties'][ThematicLayerComponent.NECKLACE_DATA]['oneOf'] = dataLayers;
  }

  /**
   * Update necklace map guide layers.
   * @param layers Layers from LayersService
   */
  private setNecklaceGuideLayers(layers) {
    // Use only layers of type geojson
    layers = layers.filter(layer => layer.type === 'circle');
    const guideLayers = layers.map(layer => {
      return {
        title: layer.name,
        const: layer.id
      };
    });
    this.formSchema['properties']['necklace-guide']['oneOf'] = guideLayers;
  }

  private loadColumnsForDataLayer(layerId) {
    const url = 'http://localhost:4201/layers/info/?id=' + layerId;
    this.http.get(url).subscribe(
      data => {
        const dataColumns = data['columns'].map(
          item => {
            return { 'title': item, 'const': item };
          }
        );
        this.formSchema['properties']['necklace-data-column']['oneOf'] = dataColumns;
        this.triggerSchemaUpdate();
      }
    );

  }

  private triggerSchemaUpdate() {
    // We need to assign a new value to schema to trigger reload
    const schemaCopy = JSON.parse(JSON.stringify(this.formSchema));
    this.formSchema = schemaCopy;
  }

  public onChanges(changes) {
    if (changes['algorithm'] === ThematicLayerComponent.NECKLACE_ALGORITHM &&
        changes[ThematicLayerComponent.NECKLACE_DATA] !== this.knownValues[ThematicLayerComponent.NECKLACE_DATA]) {
      // Keep track of know form values to avoid multiple calls to onChanges
      // `formData` should serve the same purpose but is updated afterwards
      this.knownValues[ThematicLayerComponent.NECKLACE_DATA] = changes[ThematicLayerComponent.NECKLACE_DATA];
      this.loadColumnsForDataLayer(this.knownValues[ThematicLayerComponent.NECKLACE_DATA]);
    }
  }

  public onSubmit(event) {
    this.computeService.submit(this.formData).subscribe(
      data => {
        // Process response
        console.log(data);
        this.layersService.loadLayers();
      }
    );
  }
}
