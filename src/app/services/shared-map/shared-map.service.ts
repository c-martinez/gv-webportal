import { Injectable } from '@angular/core';

import { Map } from 'leaflet';

@Injectable()
export class SharedMapService {
  private _map: Map;

  constructor() { }

  public registerMap(map: Map) {
    this._map = map;
  }

  public getMap(): Map {
    return this._map;
  }
}
