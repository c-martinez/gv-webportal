import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { MdlModule, MdlIconModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SelectModule } from 'ng-select';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { LayerSelectorComponent } from './components/layer-selector/layer-selector.component';
import { DataLayerCreatorComponent } from './components/data-layer-creator/data-layer-creator.component';
import { SharedMapService } from './services/shared-map/shared-map.service';

import { LayersService, BackendService } from 'regis-layers';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    LayerSelectorComponent,
    DataLayerCreatorComponent
  ],
  imports: [
    MdlModule,
    MdlIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    SelectModule,
    LeafletModule.forRoot(),
    DropzoneModule,
  ],
  entryComponents: [DataLayerCreatorComponent],
  providers: [
    LayersService,
    BackendService,
    SharedMapService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
