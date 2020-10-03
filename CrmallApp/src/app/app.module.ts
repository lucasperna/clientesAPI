import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { ClienteService } from './_services/cliente.service';
import { ApiService } from './_services/api/api.service';

import { DateTimeFormatPipePipe } from './_helps/DateTimeFormatPipe.pipe';

import { AppComponent } from './app.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NavComponent } from './nav/nav.component';
import { ContatoComponent } from './contato/contato.component';
import { BarraTituloComponent } from './_share/barra-titulo/barra-titulo.component';

@NgModule({
  declarations: [
    AppComponent,
      ClientesComponent,
      NavComponent,
      DateTimeFormatPipePipe,
      BarraTituloComponent,
      ContatoComponent
   ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
