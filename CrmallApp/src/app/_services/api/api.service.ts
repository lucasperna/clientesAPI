import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/_models/Api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  getApi(cep: number): Observable<Api>  {
    return this.http.get<Api>(`${this.baseURL}/${cep}/json/`);
  }

}
