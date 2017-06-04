import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class NetService {

    constructor() {}

    post(url: string, headers: any, body: any) {
        return new Observable(obser => {
            const xhr: any = new XMLHttpRequest();


            xhr.open('POST', url, true);


            for (const i in headers) {
                xhr.setRequestHeader(i, headers[i]);
            }

            xhr.upload.onprogress = function (e) {
                const ratio = Math.floor((e.loaded / e.total) * 100);

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
    }
}