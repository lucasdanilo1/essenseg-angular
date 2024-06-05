import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaDetalhadaService {

  constructor(private route: ActivatedRoute) { }

  getEmpresaPorId() {
    this.route.params.subscribe(params => {
      const empresaId = params['id'];
      return empresaId
    });
  }

}
