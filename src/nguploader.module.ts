import { CommonModule } from '@angular/common';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { NGUploaderComponent } from "./file-uploader/ng-uploader.component";
import { NetService } from "./netService/net.service";

@NgModule({
    declarations: [
        NGUploaderComponent
    ],
    exports: [
        NGUploaderComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        NetService
    ]
})
export class NgUploaderModule {
    static forRoot() {
        return {
            ngModule: NgUploaderModule,
            providers: []
        };
    }
}
