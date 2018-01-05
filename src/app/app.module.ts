import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdlModule, MdlIconModule } from '@angular-mdl/core';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';
import { LayerSelectorComponent } from './components/layer-selector/layer-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    LayerSelectorComponent
  ],
  imports: [
    MdlModule,
    MdlIconModule,
    FormsModule,
    BrowserModule,
    LeafletModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
