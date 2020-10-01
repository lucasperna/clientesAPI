import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cliente } from '../_models/Cliente';
import { ClienteService } from '../_services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  _filtroLista: string;
  clientesFiltrados: Cliente[];
  clientes: Cliente[];
  modalRef: BsModalRef;

  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService
    ) { }

  get filtroLista(): string{
    return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ?  this.filtrarCliente(this.filtroLista) : this.clientes;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  filtrarCliente(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getAllClientes()
    .subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.clientesFiltrados = this.clientes;
        console.log(_clientes);
      }, error => {
        console.log(error);
      }
    );
  }

}
