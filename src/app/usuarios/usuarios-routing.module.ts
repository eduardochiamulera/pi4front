import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormUsuarioComponent } from './form-usuario/form-usuario.component';
import { TabelaUsuarioComponent } from './tabela-usuario/tabela-usuario.component';

const routes: Routes = [
  {path: '', component: TabelaUsuarioComponent},
  {path: 'new', component: FormUsuarioComponent},
  {path: ':id/edit', component: FormUsuarioComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
