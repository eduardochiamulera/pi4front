import { Component, Input, OnInit } from '@angular/core';
import { UsuarioModel } from '../shared/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-tabela-usuario',
  templateUrl: './tabela-usuario.component.html',
  styleUrls: ['./tabela-usuario.component.css']
})
export class TabelaUsuarioComponent implements OnInit {

  @Input('nome') nomeComponente = 'Tabela de Usuarios';
  usuarios: UsuarioModel[] = [];
  nomePesquisado = "";

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.usuarioService.getAll().subscribe(
      data => {this.usuarios = data; }
    );
  }

  deletar(id){
    const deleteConfirm = confirm('deseja realmente deletar o usuario?');

    if(deleteConfirm){
      this.usuarioService.delete(id).subscribe(
        () => this.listar(),
        () => alert("Erro ao tentar excluir")
      )
    }
  }


}
