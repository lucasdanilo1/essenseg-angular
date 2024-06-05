import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private url = environment.api

  constructor(private httpClient: HttpClient) { }

  cadastrarCliente(dados: object): Observable<any>{
    return this.httpClient.post(this.url + '/cliente/cadastro/save', dados);
  }

}
