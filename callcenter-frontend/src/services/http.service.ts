import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
    this.headers.append('Content-Type', 'application/json;charset=utf=8');
    this.headers.append('Accept', 'application/json;charset=utf=8, */*');
   }

   async GET<T>(url: string, data: any = {}) {
    if (data) {
      data.format = 'json';
    } else {
      data = {};
      data.format = 'json';
    }
    return await this.http.get<T>(url, {headers: this.headers, params: data});
  }
}
