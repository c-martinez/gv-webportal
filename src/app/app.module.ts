import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdlModule, MdlIconModule } from '@angular-mdl/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent
  ],
  imports: [
    MdlModule,
    MdlIconModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
