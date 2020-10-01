import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  _filtroLista: string;
  clientesFiltrados: any = [];
  clientes: any = [] ;

  constructor(private http: HttpClient) { }

  get filtroLista(): string{
    return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ?  this.filtrarCliente(this.filtroLista) : this.clientes;
  }

  filtrarCliente(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this.clientes = this.http.get('http://localhost:5000/api/WeatherForecast')
    .subscribe(
      response => {
        this.clientes = response;
        console.log(response);
      }, error => {
        console.log(error);
      }
    );
  }

}
