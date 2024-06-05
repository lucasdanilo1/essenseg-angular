import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OperadoraService } from '../../../services/operadora.service';
import { AdministradoraService } from '../../../services/administradora.service';
import { CorretorService } from '../../../services/corretor.service';
import { Administradora } from '../../../models/administradora';
import { Operadora } from '../../../models/operadora.model';
import { Corretor } from '../../../models/corretor';
import { Plano } from '../../../models/plano';
import { CommonModule } from '@angular/common';
import { ListaSeguradosService } from '../../../services/lista-segurados.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaSeguradosComponent } from '../lista-segurados/lista-segurados.component';
import { Segurado } from '../../../models/segurado-listagem.model';


@Component({
  selector: 'app-card-filtros',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ListaSeguradosComponent],
  templateUrl: './card-filtros.component.html',
  styleUrl: './card-filtros.component.scss'
})
export class CardFiltrosComponent implements OnInit {

  public segurados: Segurado[] = [];

  public administradoras: Administradora[] = [];

  public operadoras: Operadora[] = [];

  public corretores: Corretor[] = [];

  public planos: Plano[] = [];

  public filtrosParam?: any;

  @Output() filtroSubmetido = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private operadoraService: OperadoraService,
    private corretorService: CorretorService,
    private administradoraService: AdministradoraService,
  ) { }

  ngOnInit(): void {
    
    this.getCorretores();

    this.getOperadoras();

    this.getAdministradoras();
    
    this.filtrosParam = this.fb.group({
      dataVigencia1: null,
      dataVigencia2: null,
      dataNascimento1: null,
      dataNascimento2: null,
      corretorId: null,
      segmentacao: null,
      operadoraId: null,
      administradoraId: null,
      filtroGlobal: null
    })

  }

  onSubmit(): void {
    this.filtroSubmetido.emit(this.filtrosParam.value);
  }

  getAdministradoras() {
    this.administradoraService.listaAdministradoras().subscribe(data => {
      this.administradoras = data;
    });
  }

  getOperadoras() {
    this.operadoraService.listaOperadoras().subscribe(data => {
      this.operadoras = data;
    });
  }

  getCorretores() {
    this.corretorService.listaCorretores().subscribe(data => {
      this.corretores = data;
    });
  }

}
