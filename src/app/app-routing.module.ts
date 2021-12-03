import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'produto', loadChildren: () => import('./produtos/produto.module').then(p => p.ProdutoModule)},
  { path: 'usuario', loadChildren: () => import('./usuarios/usuarios.module').then(p => p.UsuariosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
