import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ProdutoModel } from './produto.model';
import { map, catchError } from "rxjs/operators";

const httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
  })
export class ProdutoService{
    private apiPath: string = "http://localhost:3000/api/produto";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProdutoModel[]>{
    return this.http.get<ProdutoModel[]>(this.apiPath);
  }

  getById(id: number): Observable<ProdutoModel>{
    const uri = `${this.apiPath}/${id}`;
    return this.http.get<ProdutoModel>(uri);
  }

  create(produto: ProdutoModel) : Observable<ProdutoModel>{
    return this.http.post<ProdutoModel>(this.apiPath, produto, httpOptions)
  }

  update(produto: ProdutoModel, id: string) : Observable<ProdutoModel>{
    const uri = `${this.apiPath}/${id}`;
    return this.http.put<ProdutoModel>(uri, produto, httpOptions)
  }

  delete(id) {
    const uri = `${this.apiPath}/${id}`;
    return this.http.delete(uri);
  }
}