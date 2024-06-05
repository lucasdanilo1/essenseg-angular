import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Plano } from '../models/plano';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  public url:string = environment.api;

  constructor(private httpClient: HttpClient) { }

  cadastrarPlano(dados: any): Observable<any>{
    const url = this.url + "/plano/cadastro/save";

    return this.httpClient.post(url, dados);
  }

  public listaPlanosByOperadora(operadoraId?: any): Observable<Plano[]> {
    const url = this.url + "/plano/listagem/operadora/" + operadoraId;
  
    return this.httpClient.get<Plano[]>(url);
  }

}
