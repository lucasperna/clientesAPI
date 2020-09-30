import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: any ;

  constructor(private http: HttpClient) { }

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
