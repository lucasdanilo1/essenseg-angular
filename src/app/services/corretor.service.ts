import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Corretor } from '../models/corretor';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorretorService {

  public url:string = environment.api;

  constructor(private httpClient: HttpClient) { }

  public listaCorretores(): Observable<Corretor[]>{
    return this.httpClient.get<Corretor[]>(this.url + '/corretor/lista');
  }

  cadastrarCorretor(novoCorretor: any): Observable<any> {
      return this.httpClient.post(this.url + '/corretor/cadastro/save', novoCorretor);
  }

}
