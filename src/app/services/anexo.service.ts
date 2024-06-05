import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo } from '../models/anexo.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  private url = environment.api

  constructor(private httpClient: HttpClient) { }

  listaAnexosPorSegurado(seguradoId: any): Observable<Anexo[]> {
    return this.httpClient.get<Anexo[]>(this.url + '/anexo/segurado/' + seguradoId + '/anexos')
  }

  downloadArquivo(anexoId: any, nomeArquivo: string) {

    this.httpClient.get(this.url + '/anexo/' + anexoId, { responseType: 'blob' })
      .subscribe((data: any) => {
        this.handleDownload(data, nomeArquivo);
      });
  }

  private handleDownload(data: any, nomeArquivo: string) {

    const blob = new Blob([data], { type: 'application/octet-stream' });

    const link = document.createElement('a');

    link.href = window.URL.createObjectURL(blob);

    link.download = nomeArquivo;

    link.click();

    window.URL.revokeObjectURL(link.href);

    link.remove();
  }

  novoAnexo(seguradoId: any, formData: any){
    
    return this.httpClient.put(this.url + '/anexo/segurado/' + seguradoId, formData);
    
  }

}
