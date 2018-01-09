import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdlModule, MdlIconModule } from '@angular-mdl/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SelectModule } from 'ng-select';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { LayerSelectorComponent } from './components/layer-selector/layer-selector.component';
import { DataLayerCreatorComponent } from './components/data-layer-creator/data-layer-creator.component';

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
    SelectModule,
    LeafletModule.forRoot()
  ],
  entryComponents: [DataLayerCreatorComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
