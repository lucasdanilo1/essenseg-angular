import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RelacaoOperadoraAdministradora } from '../models/operadora-administradora';

@Injectable({
  providedIn: 'root'
})
export class OperadoraAdministradoraService {

  private url = environment.api

  constructor(private httpClient: HttpClient) {
   }

  obterListaSegurados(): Observable<RelacaoOperadoraAdministradora[]>{
    return this.httpClient.get<RelacaoOperadoraAdministradora[]>(this.url + '/relacao/administradora-operadora/listagem').pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = ""

      if(error.error instanceof ErrorEvent){
        errorMessage = "Error code: " + error.status + ", message: " + error.message
      }
      return throwError(() => errorMessage);
    }))
  }

  fazerRelacao(dados: any) : Observable<any> {

    return this.httpClient.post(this.url + '/relacao/administradora-operadora/cadastrar', dados).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = ""

      if(error.error instanceof ErrorEvent){
        errorMessage = "Error code: " + error.status + ", message: " + error.message
      }
      return throwError(() => errorMessage);
    }))
  
  }

}
