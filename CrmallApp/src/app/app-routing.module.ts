import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ContatoComponent } from './contato/contato.component';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'contato', component: ContatoComponent},
  {path: '**', redirectTo: 'clientes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
