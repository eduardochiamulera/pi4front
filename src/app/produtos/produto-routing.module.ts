import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormProdutoComponent } from './form-produto/form-produto.component';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';

const routes: Routes = [
  {path: '', component: TabelaProdutoComponent},
  {path: 'new', component: FormProdutoComponent},
  {path: ':id/edit', component: FormProdutoComponent}  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
