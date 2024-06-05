import { Component, OnInit } from '@angular/core';
import { PlanoService } from '../services/plano.service';
import { AdministradoraService } from '../services/administradora.service';
import { Plano } from '../models/plano';
import { Administradora } from '../models/administradora';
import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OperadoraService } from '../services/operadora.service';
import { Operadora } from '../models/operadora.model';
import { OperadoraAdministradoraService } from '../services/operadora-administradora.service';
import { BotaoVoltarComponent } from '../shared/components/botao-voltar/botao-voltar.component';

@Component({
  selector: 'app-operadora-detalhada',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BotaoVoltarComponent],
  templateUrl: './operadora-detalhada.component.html',
  styleUrl: './operadora-detalhada.component.scss'
})
export class OperadoraDetalhadaComponent implements OnInit {

  public administradoras: Administradora[] = [];

  public operadoraId!: number;

  public operadora?: Operadora;

  public planos: Plano[] = [];

  public administradorasNaoVinculadas?: Administradora[];

  public formAdministradora!: FormGroup;

  public formPlano!: FormGroup;

  constructor(
    public planoService: PlanoService,
    public administradoraService: AdministradoraService,
    public operadoraService: OperadoraService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private operadoraAdministradoraService: OperadoraAdministradoraService,
    private location: Location
  ) {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.operadoraId = id;
    });

    this.operadoraService.findOperadoraById(this.operadoraId).subscribe(
      (operadora) => {
        this.operadora = operadora;
      }
    );

  }

  ngOnInit(): void {

    this.formAdministradora = this.fb.group({
      operadoraId: [this.operadoraId],
      administradoraId: [null, Validators.required]
    })

    this.formPlano = this.fb.group({
      operadoraId: [this.operadoraId],
      nome: [null, Validators.required]
    })

    this.getAdministradorasByOperadora();
    this.getAdministradorasNaoVinculadas();
    this.getPlanosByOperadora();
  }

  onSubmitPlanoModal() {
    this.planoService.cadastrarPlano(this.formPlano.value).subscribe(() => {
      this.refresh()
    });
  }

  onSubmitAdministradoraModal() {
    this.operadoraAdministradoraService.fazerRelacao(this.formAdministradora.value).subscribe(() => {
      this.refresh()
    });
  }

  getAdministradorasByOperadora() {
    this.administradoraService.listaAdministradorasByOperadora(this.operadoraId).subscribe(data => {
      this.administradoras = data;
    })
  }

  getAdministradorasNaoVinculadas() {
    this.administradoraService.listaAdministradorasSemRelacaoComOperadora(this.operadoraId).subscribe(data => {
      this.administradorasNaoVinculadas = data;
    })
  }

  getPlanosByOperadora() {
    this.planoService.listaPlanosByOperadora(this.operadoraId).subscribe(data => {
      this.planos = data;
    });
  }

  refresh(): void {
    this.location.replaceState(this.location.path());
    window.location.reload();
  }

}
