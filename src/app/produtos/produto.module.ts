import { NgModule } from '@angular/core';
import { ProdutoRoutingModule } from './produto-routing.module';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { FormProdutoComponent } from './form-produto/form-produto.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  declarations: [TabelaProdutoComponent, FormProdutoComponent],
  imports: [
    ProdutoRoutingModule,  
    SharedModule,
    FormsModule,
    ReactiveFormsModule 
  ],
})
export class ProdutoModule { }
