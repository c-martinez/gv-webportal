import { Component, OnInit, HostListener } from '@angular/core';
import { MdlDialogReference } from '@angular-mdl/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IOption } from 'ng-select';


@Component({
  selector: 'app-data-layer-creator',
  templateUrl: './data-layer-creator.component.html',
  styleUrls: ['./data-layer-creator.component.css']
})
export class DataLayerCreatorComponent implements OnInit {
  private static ESC_KEY = 27;
  private static TAB_OPTIONS: Array<IOption> = [
    {value: 'upload'  , label: 'Upload dataset'},
    {value: 'circle'  , label: 'Circular guide'},
    {value: 'freehand', label: 'Free hand guide'}
  ];
  private tabOptions: Array<IOption> = this.getOptions();
  private selectedTab = DataLayerCreatorComponent.TAB_OPTIONS[0].value;

  private circleForm: FormGroup;

  constructor(private dialog: MdlDialogReference) { }


  ngOnInit() {
    // FormGroup for circle data
    this.circleForm = new FormGroup({
      center: new FormControl(),
      radius: new FormControl()
    });
  }

  @HostListener('window:keyup', ['$event'])
  public onEsc(event: KeyboardEvent): void {
    if ( event.keyCode === DataLayerCreatorComponent.ESC_KEY) {
      this.doClose();
    }
  }

  public doClose(): void {
    this.dialog.hide();
  }

  private getOptions(): Array<IOption> {
    return DataLayerCreatorComponent.TAB_OPTIONS.map(option => ({
        value: option.value,
        label: option.label
   }));
  }
}
