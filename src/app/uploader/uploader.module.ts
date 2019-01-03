
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploaderComponent } from './uploader.component';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        UploaderComponent
    ],
    declarations: [UploaderComponent],
    providers: [],
})
export class UploaderModule { }
