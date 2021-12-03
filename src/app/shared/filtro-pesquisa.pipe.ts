import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroPesquisa'
})
export class FiltroPesquisaPipe implements PipeTransform {

  transform(lista: any[], valor?: string): any[] {
    const nome = valor ?valor :"";
    return lista.filter ((produto) =>
       produto.name.toLowerCase().includes(nome.toLowerCase()));
  }


}
