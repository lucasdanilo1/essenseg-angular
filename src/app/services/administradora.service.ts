import { Injectable } from '@angular/core';
import { Administradora } from '../models/administradora';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradoraService {

  public url: string = environment.api;

  constructor(private httpClient: HttpClient) { }

  cadastrarAdministradora(novaAdministradora: any): Observable<any> {
    return this.httpClient.post(this.url + '/administradora/cadastro/save', novaAdministradora);
  }

  listaAdministradoras(): Observable<Administradora[]> {
    return this.httpClient.get<Administradora[]>(this.url + '/administradora/lista');
  }

  listaAdministradorasByOperadora(operadoraId: any): Observable<Administradora[]> {
    const url = this.url + '/relacao/administradora/lista/operadora/' + operadoraId;

    return this.httpClient.get<Administradora[]>(url);
  }

  listaAdministradorasSemRelacaoComOperadora(operadoraId: any): Observable<Administradora[]> {
    const url = this.url + '/relacao/administradoras/disponiveis/operadora/' + operadoraId;
    
    return this.httpClient.get<Administradora[]>(url);
  }

}
