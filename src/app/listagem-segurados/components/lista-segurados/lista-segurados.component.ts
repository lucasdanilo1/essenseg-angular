import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ListaSeguradosService } from '../../../services/lista-segurados.service';
import { Segurado } from '../../../models/segurado-listagem.model';
import { CardFiltrosComponent } from '../card-filtros/card-filtros.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ResponsePageable } from '../../../models/responsePageable.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-segurados',
  standalone: true,
  templateUrl: './lista-segurados.component.html',
  styleUrl: './lista-segurados.component.scss',
  imports: [CommonModule,
    HttpClientModule,
    CardFiltrosComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class ListaSeguradosComponent implements OnInit {

  public segurados: Segurado[] = [];

  public page!: ResponsePageable;

  public seguradosTotais: number = 0;

  public paginaAtual: number = 1;

  public paginasTotais?: number;

  constructor(private listaSeguradoService: ListaSeguradosService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSegurados();
  }

  inativarAtivarSegurado(seguradoId: string, nomeSegurado: string) {
    this.listaSeguradoService.inativarAtivarSegurado(seguradoId).subscribe(() => {
      this.getSegurados();
    });
    this.toastr.info('Mudanças aplicadas ao Segurado: ' + nomeSegurado, 'Atenção!');
  }

  detalhamentoSegurado(seguradoId: string, seguradoTipo: string) {
    if (seguradoTipo === 'cliente') {
      window.location.href = `/segurados/cliente/${seguradoId}`;
    } else if (seguradoTipo === 'empresa') {
      window.location.href = `/segurados/empresa/${seguradoId}`;
    }
  }

  getSegurados() {
    this.listaSeguradoService.obterListaSegurados().subscribe(data => {
      this.segurados = data.content;
      this.seguradosTotais = data.totalElements;
    })
  }

  getSeguradosFiltrados(filtros: any) {
    this.listaSeguradoService.obterListaSeguradosFiltrada(filtros).subscribe(data => {
      this.segurados = data.content;
      this.seguradosTotais = data.totalElements;
    })
  }

}
