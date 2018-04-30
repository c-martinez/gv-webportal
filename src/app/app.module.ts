import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MdlModule, MdlIconModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SelectModule } from 'ng-select';
import { MdlSelectModule } from '@angular-mdl/select';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { JsonSchemaFormModule, MaterialDesignFrameworkModule } from 'angular2-json-schema-form';
import { JsonSchemaFormService, FrameworkLibraryService, WidgetLibraryService, MaterialDesignFramework,
  Framework } from 'angular2-json-schema-form';


import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { LayerSelectorComponent } from './components/layer-selector/layer-selector.component';
import { DataLayerCreatorComponent } from './components/data-layer-creator/data-layer-creator.component';
import { ThematicLayerComponent } from './components/thematic-layer/thematic-layer.component';

import { SharedMapService } from './services/shared-map/shared-map.service';
import { ComputeService } from './services/compute/compute.service';

import { LayersService, BackendService } from 'regis-layers';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    LayerSelectorComponent,
    DataLayerCreatorComponent,
    ThematicLayerComponent
  ],
  imports: [
    MdlModule,
    MdlIconModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SelectModule,
    MdlSelectModule,
    LeafletModule.forRoot(),
    DropzoneModule,
    MaterialDesignFrameworkModule,
    {
      ngModule: JsonSchemaFormModule,
      providers: [
          JsonSchemaFormService,
          FrameworkLibraryService,
          WidgetLibraryService,
          {provide: Framework, useClass: MaterialDesignFramework, multi: true}
      ]
    }
  ],
  entryComponents: [DataLayerCreatorComponent],
  providers: [
    LayersService,
    BackendService,
    SharedMapService,
    ComputeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
