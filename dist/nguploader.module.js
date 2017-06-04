import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NGUploaderComponent } from "./file-uploader/ng-uploader.component";
import { NetService } from "./netService/net.service";
var NgUploaderModule = (function () {
    function NgUploaderModule() {
    }
    NgUploaderModule.forRoot = function () {
        return {
            ngModule: NgUploaderModule,
            providers: []
        };
    };
    return NgUploaderModule;
}());
export { NgUploaderModule };
NgUploaderModule.decorators = [
    { type: NgModule, args: [{
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
                ],
                schemas: [NO_ERRORS_SCHEMA]
            },] },
];
/** @nocollapse */
NgUploaderModule.ctorParameters = function () { return []; };
//# sourceMappingURL=nguploader.module.js.map