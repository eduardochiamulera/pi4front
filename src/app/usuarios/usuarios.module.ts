import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { TabelaUsuarioComponent } from './tabela-usuario/tabela-usuario.component';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [TabelaUsuarioComponent, FormUsuarioComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,  
    SharedModule,
    FormsModule,
    ReactiveFormsModule   
  ]
})
export class UsuariosModule { }
