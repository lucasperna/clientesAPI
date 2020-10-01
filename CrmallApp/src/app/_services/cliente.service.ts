import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  baseURL = 'http://localhost:5000/api/cliente';

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Cliente[]>  {
    return this.http.get<Cliente[]>(this.baseURL);
  }

  getClienteById(id: number): Observable<Cliente>  {
    return this.http.get<Cliente>(`${this.baseURL}/${id}`);
  }

  getClienteByNome(nome: string): Observable<Cliente[]>  {
    return this.http.get<Cliente[]>(`${this.baseURL}/getByNome/${nome}`);
  }

}
