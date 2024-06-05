import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponsePageable } from '../models/responsePageable.model';

@Injectable({
  providedIn: 'root',
})
export class ListaSeguradosService {

  private url = environment.api

  constructor(private httpClient: HttpClient) {
   }

  inativarAtivarSegurado(seguradoId: string): Observable<any>{
    return this.httpClient.delete(this.url + '/segurado/inativar-ativar/' + seguradoId);
  }

  obterListaSegurados(): Observable<ResponsePageable>{
    return this.httpClient.get<ResponsePageable>(this.url + '/segurado/lista');
  }

  obterListaSeguradosPaginada(pagina: number): Observable<ResponsePageable>{

    let params = new HttpParams().set("?page", pagina)

    return this.httpClient.get<ResponsePageable>(this.url + '/segurado/lista', {params: params});
  }

  obterListaSeguradosFiltrada(filtros: object): Observable<ResponsePageable>{
    return this.httpClient.post<ResponsePageable>(this.url + '/segurado/lista/filtrada', filtros);
  }

  obterListaSeguradosFiltradaPaginada(filtros: object, pagina: number): Observable<ResponsePageable>{

    let params = new HttpParams().set("?page", pagina)

    return this.httpClient.post<ResponsePageable>(this.url + '/segurado/lista/filtrada', {params: params}, filtros);
  }

}
