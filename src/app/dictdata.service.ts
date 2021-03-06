import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'

import { map, catchError, } from 'rxjs/operators';


import { EfDictdataService } from 'ngx-easyform'

@Injectable()
export class DictdataService extends EfDictdataService {
    private _prefix = "dict/"
    private _getDictDataMaps = 'getDictDataMaps'

    results: any

    constructor(public http: HttpClient) {
        super(http)
    }

    getDictDataMaps(ids: string[]) {
        let url = this._prefix + this._getDictDataMaps
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = { headers: headers };

        return this.http.post(url, JSON.stringify(ids), options)
            // .catchError(this.handleError)
            .subscribe(
                data => {
                    this.results = data
                }
            )
    }

    getDictDataValue(dictType: string, dictname: string) {
        let dictdata = this.results[dictType][dictname]
        return dictdata.dictdataValue
    }

    getDictDataObserable(dictName: string): Observable<any[]> {
        let urlSearchParams = new HttpParams();
        urlSearchParams.set('dictTypeName', dictName);
        // urlSearchParams.set('', );
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = {
            headers: headers,
            params: urlSearchParams
        };
        // debugger
        return this.http.get<any[]>('./dict/getByDictTypeName', options)

        // let baseUrl = 'ws/getDictDataMap'
        // let param = {
        //     dictTypeNames: [dictName]
        // }
        // // {"dictTypeNames":["服务分类"]}
        // return this.http.post(baseUrl, JSON.stringify(param), options)
        //     .map((data) => data.json().result[dictName])
    }
}