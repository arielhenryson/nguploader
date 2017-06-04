import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
var NetService = (function () {
    function NetService() {
    }
    NetService.prototype.post = function (url, headers, body) {
        return new Observable(function (obser) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            for (var i in headers) {
                xhr.setRequestHeader(i, headers[i]);
            }
            xhr.upload.onprogress = function (e) {
                var ratio = Math.floor((e.loaded / e.total) * 100);
                obser.next({
                    progress: ratio,
                    data: null
                });
            };
            xhr.onload = function () {
                obser.next({
                    progress: 100,
                    data: this.responseText
                });
                obser.complete();
            };
            xhr.send(body);
        });
    };
    return NetService;
}());
export { NetService };
NetService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NetService.ctorParameters = function () { return []; };
//# sourceMappingURL=net.service.js.map