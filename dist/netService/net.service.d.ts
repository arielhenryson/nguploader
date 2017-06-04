import { Observable } from "rxjs/Observable";
export declare class NetService {
    constructor();
    post(url: string, headers: any, body: any): Observable<{}>;
}
