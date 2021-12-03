import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UsuarioModel } from "./usuario.model";

const httpOptions = { 
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}

@Injectable({
    providedIn: 'root'
  })
export class UsuarioService{
    private apiPath: string = "http://localhost:3000/api/user";

  constructor(private http: HttpClient) { }

  getAll(): Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(this.apiPath);
  }

  getById(id: number): Observable<UsuarioModel>{
    const uri = `${this.apiPath}/${id}`;
    return this.http.get<UsuarioModel>(uri);
  }

  create(usuario: UsuarioModel) : Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(this.apiPath, usuario, httpOptions)
  }

  update(usuario: UsuarioModel, id: string) : Observable<UsuarioModel>{
    const uri = `${this.apiPath}/${id}`;
    return this.http.put<UsuarioModel>(uri, usuario, httpOptions)
  }

  delete(id) {
    const uri = `${this.apiPath}/${id}`;
    return this.http.delete(uri);
  }
}