import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonResponse } from '../model/json-response.class';
import { LineItem } from '../model/line-item.class';

const url: string = "http://localhost:8080/line-items/";

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(
    private http: HttpClient
    ) { }

  get(id: number): Observable<JsonResponse> {
    return this.http.get(url+id) as Observable<JsonResponse>;
  } 
  list(): Observable<JsonResponse> {
    return this.http.get(url) as Observable<JsonResponse>;
  }   
  create(lineitem: LineItem): Observable<JsonResponse> {
    console.log("lineitem create", lineitem)
    return this.http.post(url,lineitem) as Observable<JsonResponse>;
  } 
  edit(lineitem: LineItem): Observable<JsonResponse> {
    console.log("lineitem edit",lineitem)
    return this.http.put(url,lineitem) as Observable<JsonResponse>;
  } 
  delete(id: number): Observable<JsonResponse> {
    return this.http.delete(url+id) as Observable<JsonResponse>;
  } 
  linesforpr(id: number): Observable<JsonResponse> {
    console.log("lines for request",id );
    return this.http.get(url+"lines-for-pr/"+id) as Observable<JsonResponse>;
  }
  // add a method to call /lines-for-pr/{id}
}