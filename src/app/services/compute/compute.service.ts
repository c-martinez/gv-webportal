import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ComputeService {
  private static computeServiceUrl = 'http://localhost:4201/compute/execute/';

  constructor(
    private http: HttpClient
  ) { }

  public submit(data) {
    console.log('Compute service: Submit compute job and generate new layer...');
    console.log(data);

    const computeUrl = ComputeService.computeServiceUrl + data['algorithm'];
    const postData = {
      'data-layer'       : data['necklace-data'],
      'data-layer-column': data['necklace-data-column'],
      'guide-layer'      : data['necklace-guide'],
    };

    return this.http.post(computeUrl, postData);
  }
}
