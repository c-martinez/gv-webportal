import { ViewChild } from '@angular/core';
import { basename, extname } from 'path';

import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';

import { LayersService } from 'regis-layers';
import { config } from '../../../gv-portal.config';

/**
 * This class contains functionality for uploading a file and
 * creating a layer out of it.
 */
export class UploadLayerCreator {
    private dzComponent: DropzoneComponent;
    private layerName: string;

    constructor(
        private layersService: LayersService,
        dropComponent: DropzoneComponent
    ) {
        this.dzComponent = dropComponent;
    }

    public dropConfig: DropzoneConfigInterface = {
        url: config.urls.layersService + 'add/', // 'add' endpoint
        maxFiles: 1,
        clickable: true,
        createImageThumbnails: false,
        autoProcessQueue: false,
        paramName: 'file',
        params: (files) => this.prepareRequest(files, this.layerName)
    };

    public setLayerName(name: string) {
        this.layerName = name;
    }

    public createUploadLayer() {
        const dropzone = this.dzComponent.directiveRef.dropzone;
        dropzone.processQueue();
    }

    public clearUploader() {
        const dropzone = this.dzComponent.directiveRef.dropzone;
        dropzone.removeAllFiles();
    }

    public onUploadSuccess(event: any) {
        // event[0] -- Original Request
        // event[1] -- server response
        // event[2] -- ProgressEvent
        const response = event[1];
        if (response.status === 'ok') {
          this.layersService.displayLayer(response.layer);

          const dropzone = this.dzComponent.directiveRef.dropzone;
          dropzone.removeAllFiles();
        }
      }

      public onUploadError(event: any) {
        console.log('upload error: ');
        console.log(event);
      }

      private prepareRequest(files, layerName) {
        let filename = layerName;
        if (filename === '') {  // if no name is given on the form, use the file name
            filename = files[0]['name'];
            filename = basename(filename, extname(filename));
        }

        const mymap = {
            'name': filename,
            'type': 'geojson',
            'active': true
        };

        return mymap;
    }
}
