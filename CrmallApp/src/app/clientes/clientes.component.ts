import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { Cliente } from '../_models/Cliente';
import { ClienteService } from '../_services/cliente.service';
import { templateJitUrl } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  title = 'Clientes';
  _filtroLista: string;
  clientesFiltrados: Cliente[];
  clientes: Cliente[];
  cliente: Cliente;
  registerForm: FormGroup;
  modoSalvar = 'post';
  bodyDeletarCliente = '';
  dataNascimento: string;

  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localeService.use('pt-br');
    }

  get filtroLista(): string{
    return this._filtroLista;
  }

  set filtroLista(value: string){
    this._filtroLista = value;
    this.clientesFiltrados = this.filtroLista ?  this.filtrarCliente(this.filtroLista) : this.clientes;
  }


  editarCliente(cliente: Cliente, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.cliente = cliente;
    this.registerForm.patchValue(cliente);
  }

  novoCliente(template: any){
    this.modoSalvar = 'post';
    this.openModal(template);
  }

  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }

  filtrarCliente(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  validation(){
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.nullValidator]],
      dataNascimento: ['', Validators.required],
      sexo: ['', Validators.required],
      cep: [''],
      endereco: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      estado: [''],
      cidade: ['']
    });
  }

  salvarAlteracao(template: any){
    if (this.registerForm.valid) {
      if (this.modoSalvar === 'post') {
        this.cliente = Object.assign({}, this.registerForm.value);
        this.clienteService.postCliente(this.cliente)
        .subscribe(
          (novoCliente: Cliente) => {
            console.log(novoCliente);
            template.hide();
            this.getClientes();
            this.toastr.success('Adicionado com Sucesso');
          }, error => {
            this.toastr.error(`Erro ao inserir: ${error}`);
          }
        );
      }
      else{
        this.cliente = Object.assign({id: this.cliente.id}, this.registerForm.value);
        this.clienteService.putCliente(this.cliente)
        .subscribe(
          (novoCliente: Cliente) => {
            console.log(novoCliente);
            template.hide();
            this.getClientes();
            this.toastr.success('Editado com Sucesso');
          }, error => {
            this.toastr.error(`Erro ao editar: ${error}`);
          }
        );
      }
    }
  }

  excluirCliente(cliente: Cliente, template: any) {
    this.openModal(template);
    this.cliente = cliente;
    this.bodyDeletarCliente = `Deseja realmente excluir o Cliente: ${cliente.nome}, Código: ${cliente.id}`;
  }

  confirmeDelete(template: any) {
    this.clienteService.deleteCliente(this.cliente.id).subscribe(
      () => {
        template.hide();
        this.getClientes();
        this.toastr.success('Deletado com Sucesso');
      }, error => {
        this.toastr.error('Erro! Não foi possível excluir cliente.');
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.validation();
    this.getClientes();
  }

  getClientes(){
    this.clienteService.getAllClientes()
    .subscribe(
      (_clientes: Cliente[]) => {
        this.clientes = _clientes;
        this.clientesFiltrados = this.clientes;
      }, error => {
        this.toastr.error(`Erro ao carregar clientes: ${error}`);
      }
    );
  }

}
