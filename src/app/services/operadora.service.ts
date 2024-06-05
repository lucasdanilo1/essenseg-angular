import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Operadora } from '../models/operadora.model';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {
  

  private url = environment.api

  constructor(private httpClient: HttpClient){} 

  findOperadoraById(operadoraId: number): Observable<Operadora> {
    return this.httpClient.get<Operadora>(this.url + '/operadora/' + operadoraId);
  }

  cadastrarOperadora(novaOperadora: any): Observable<any> {
    return this.httpClient.post(this.url + '/operadora/cadastro/save', novaOperadora);
  }  


  listaOperadoras(): Observable<Operadora[]>{
    return this.httpClient.get<Operadora[]>(this.url + '/operadora/lista');
  }
}
