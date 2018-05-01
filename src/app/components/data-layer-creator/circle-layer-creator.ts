import { LayersService, CircleLayer } from 'regis-layers';

import { SharedMapService } from '../../services/shared-map/shared-map.service';

/**
 * This class contains functionality for displaying and creating
 * a circular guide on the map, and creating a layer out of it.
 */
export class CircleLayerCreator {
    private centerMarker;
    private radiusMarker;
    private layerName: string;

    constructor(
        private layersService: LayersService,
        private sharedMapService: SharedMapService
    ) { }

    public createCircleLayer() {
        this.hideCircleMarkers();
        this.addLayerToMap(false);
    }

    public setLayerName(name: string) {
        this.layerName = name;
    }

    public showCircleMarkers() {
        const theMap = this.sharedMapService.getMap();

        const center = theMap.getBounds().getCenter();
        const east = theMap.getBounds().getEast();
        const draggable = true;

        this.centerMarker = this.layersService.addMarker(center.lat, center.lng, draggable, 'center');
        this.radiusMarker = this.layersService.addMarker(center.lat, (east + center.lng) / 2, draggable, 'radius');

        this.radiusMarker.on('dragend', (e) => { this.markerMoved(e); });
        this.centerMarker.on('dragend', (e) => { this.markerMoved(e); });

        this.updateCircle(false);
    }

    public hideCircleMarkers() {
        this.layersService.removeMarker('center');  // TODO: marker names could be global constants
        this.layersService.removeMarker('radius');  // TODO: marker names could be global constants
        this.layersService.removeLayer('-1');       // TODO: layer id could be global constants
    }

    public updateCircle(circleLayerPresent: boolean) {
        if (circleLayerPresent) {
            this.layersService.removeLayer('-1');
        }
        this.addLayerToMap(true);
    }

    private addLayerToMap(virtualLayer: boolean) {
        // tslint:disable-next-line:no-debugger
        const layerName = this.layerName;
        const center = this.centerMarker.getLatLng();
        const distance = center.distanceTo(this.radiusMarker.getLatLng());
        this.layersService.addLayer(new CircleLayer('-1', layerName, true, [center.lat, center.lng], distance), virtualLayer);
    }

    private markerMoved(e) {
        this.updateCircle(true);
    }
}
