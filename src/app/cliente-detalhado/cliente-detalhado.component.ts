import { Component, OnInit } from '@angular/core';
import { ClienteDetalhadoService } from './services/cliente-detalhado.service';
import { Cliente } from '../models/segurado-detalhado.model';
import { ActivatedRoute } from '@angular/router';
import { OperadoraService } from '../services/operadora.service';
import { AdministradoraService } from '../services/administradora.service';
import { CorretorService } from '../services/corretor.service';
import { PlanoService } from '../services/plano.service';
import { Administradora } from '../models/administradora';
import { Operadora } from '../models/operadora.model';
import { Corretor } from '../models/corretor';
import { Plano } from '../models/plano';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorFeedbackComponent } from '../cadastro-cliente/components/form-error-feedback/form-error-feedback.component';
import { NgxMaskDirective } from 'ngx-mask';
import { AnexoService } from '../services/anexo.service';
import { Anexo } from '../models/anexo.model';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { BotaoVoltarComponent } from '../shared/components/botao-voltar/botao-voltar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-detalhado',
  standalone: true,
  imports: [
    CommonModule,
    FormErrorFeedbackComponent,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    BotaoVoltarComponent
  ],
  templateUrl: './cliente-detalhado.component.html',
  styleUrl: './cliente-detalhado.component.scss'
})
export class ClienteDetalhadoComponent implements OnInit {

  public cliente?: Cliente;

  public submitted: boolean = false;

  public clienteId?: string;

  public novosDados: any = {};

  public ehEditMode = false;

  public anexosSelecionados: File[] = [];

  public administradoras: Administradora[] = [];

  public anexos: Anexo[] = [];

  public operadoras: Operadora[] = [];

  public corretores: Corretor[] = [];

  public planos: Plano[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private clienteDetalhadoService: ClienteDetalhadoService,
    private operadoraService: OperadoraService,
    private administradoraService: AdministradoraService,
    private corretorService: CorretorService,
    private planoService: PlanoService,
    private anexoService: AnexoService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.clienteId = id;
    });

    await this.getCliente();

    this.formBuildAndInitData();

    this.getAnexosByClienteId();

  }

  formBuildAndInitData() {

    this.getOperadoras();
    
    this.getCorretores();

    this.novosDados = this.formBuilder.group({
      atualizaDadosSeguradoDTO: this.formBuilder.group({
        nome: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.nome, disabled: true }, [Validators.required, Validators.minLength(6)]],
        cep: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.cep, disabled: true }, [Validators.required, Validators.pattern(/^\d{8}$/)]],
        telefone: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.telefone, disabled: true }, [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        email: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.email, disabled: true }, [Validators.required, Validators.email]],
        endereco: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.endereco, disabled: true }, Validators.required],
        operadoraId: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.operadoraId, disabled: true }, Validators.required],
        administradoraId: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.administradoraId, disabled: true }],
        vigencia: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.vigencia, disabled: true }, [Validators.required]],
        planoId: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.planoId, disabled: true }, Validators.required],
        valorDoPlanoBruto: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.valorDoPlanoBruto, disabled: true }, [Validators.required, Validators.pattern(/^\d+$/)]],
        percentualComissao: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.percentualComissao, disabled: true }, Validators.required],
        adesao: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.adesao, disabled: true }, [Validators.required, Validators.pattern(/^\d+$/)]],
        segmentacao: [{ value: this.cliente?.dadosSeguradoDetalhadoDTO.segmentacao, disabled: true }, Validators.required]
      }),
      observacoes: [{ value: this.cliente?.observacoes, disabled: true }]
    });

    if (this.cliente?.dadosSeguradoDetalhadoDTO.operadoraId) {
      this.getAdministradorasByOperadora();
      this.getPlanosByOperadora();
    }

  }

  async getCliente() {
    try {
      const cliente = await this.clienteDetalhadoService.findClienteById(this.clienteId).toPromise();
      this.cliente = cliente

    } catch (error) {
      console.error("Erro ao obter o cliente:", error);
    }
  }

  onSubmit() {

    if (this.ehEditMode) {
      this.submitted = true;
    }

    if (this.novosDados.valid) {
      const dados = {
        atualizaDadosSeguradoDTO: this.novosDados.get('atualizaDadosSeguradoDTO').value,
        observacoes: this.novosDados.get('observacoes')?.value
      };
      this.atualizaCliente(dados)
    }

  }

  atualizaCliente(dados: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja submeter esse formulário?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.clienteDetalhadoService.atualizarCliente(dados, this.clienteId).subscribe({
          next: () => {
            if (this.anexosSelecionados && this.anexosSelecionados.length > 0) {
              this.enviarAnexos(this.anexosSelecionados)
            }
            this.getCliente();
          }
        });

        this.defineEditMode();

        this.toastr.success( "As informações foram alteradas" , "Sucesso!")

      }
    });
  }

  defineEditMode() {

    this.ehEditMode = !this.ehEditMode;

    const controls = (this.novosDados.get('atualizaDadosSeguradoDTO') as FormGroup).controls;

    const obsControl = (this.novosDados.get('observacoes') as FormGroup)

    if (this.ehEditMode) {
      obsControl.enable()
    } else {
      obsControl.disable()
    }

    Object.keys(controls).forEach(controlName => {
      const control = controls[controlName];

      if (this.ehEditMode) {
        control.enable()
      } else {
        control.disable()
      }

    });

  }

  onAnexosSelecionados(event: any): void {
    this.anexosSelecionados = event.target.files;
  }

  enviarAnexos(anexosSelecionados: File[]) {
    const formData = new FormData();

    for (const file of anexosSelecionados) {
      formData.append('file', file);
    }

    this.anexoService.novoAnexo(this.clienteId, formData).subscribe();
  }

  downloadAnexo(anexoId: number, nomeArquivo: string): void {
    this.anexoService.downloadArquivo(anexoId, nomeArquivo);
  }

  getAnexosByClienteId() {
    this.anexoService.listaAnexosPorSegurado(this.clienteId).subscribe(data => {
      this.anexos = data;
    })
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

  getAdministradorasByOperadora() {
    this.administradoraService.listaAdministradorasByOperadora(this.novosDados.get('atualizaDadosSeguradoDTO.operadoraId')?.value).subscribe(data => {
      this.administradoras = data;
    })
  }

  getPlanosByOperadora() {
    this.planoService.listaPlanosByOperadora(this.novosDados.get('atualizaDadosSeguradoDTO.operadoraId')?.value).subscribe(data => {
      this.planos = data;
    });
  }

  get atualizaDadosSeguradoDTOField(): { [field: string]: AbstractControl } {
    return this.novosDados.controls.atualizaDadosSeguradoDTO.controls;
  }

}
