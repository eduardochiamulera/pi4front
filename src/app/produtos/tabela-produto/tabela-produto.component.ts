import { Component, Input, OnInit } from '@angular/core';
import { ProdutoModel } from '../shared/produto.model';
import { ProdutoService } from '../shared/produto.service';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.css']
})
export class TabelaProdutoComponent implements OnInit {
  @Input('nome') nomeComponente = 'Tabela de Produtos';
  produtos: ProdutoModel[] = [];
  nomePesquisado = "";

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.produtoService.getAll().subscribe(
      data => {this.produtos = data; }
    );
  }

  deletar(id){
    const deleteConfirm = confirm('deseja realmente deletar o usuario?');

    if(deleteConfirm){
      this.produtoService.delete(id).subscribe(
        () => this.listar(),
        () => alert("Erro ao tentar excluir")
      )
    }
  }
}
