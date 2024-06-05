import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Cliente } from '../../models/segurado-detalhado.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteDetalhadoService {

  private url = environment.api

  constructor(private httpClient: HttpClient) { }

  findClienteById(id: any): Observable<Cliente>{
      return this.httpClient.get<Cliente>(this.url + '/cliente/' + id);
    }

    atualizarCliente(dados: object, clienteId: any){
      return this.httpClient.put(this.url + '/cliente/' + clienteId + '/atualizar', dados);
    }

}
