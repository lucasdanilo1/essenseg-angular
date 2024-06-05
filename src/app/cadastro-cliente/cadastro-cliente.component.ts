import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroService } from './services/cadastro.service';
import { CommonModule, Location } from '@angular/common';
import { FormErrorFeedbackComponent } from './components/form-error-feedback/form-error-feedback.component';
import { OperadoraService } from '../services/operadora.service';
import { Operadora } from '../models/operadora.model';
import { Administradora } from '../models/administradora';
import { AdministradoraService } from '../services/administradora.service';
import { CorretorService } from '../services/corretor.service';
import { Corretor } from '../models/corretor';
import { Plano } from '../models/plano';
import { PlanoService } from '../services/plano.service';

import { NgxMaskDirective } from 'ngx-mask';
import { AnexoService } from '../services/anexo.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    FormErrorFeedbackComponent,
    NgxMaskDirective,
    ConfirmationDialogComponent
  ],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent implements OnInit {

  public dadosCadastro?: any;

  public submitted: boolean = false;

  public administradoras: Administradora[] = [];

  public operadoras: Operadora[] = [];

  public corretores: Corretor[] = [];

  public planos: Plano[] = [];

  public anexosSelecionados: File[] = [];

  constructor(private cadastroService: CadastroService,
    private formBuilder: FormBuilder,
    private operadoraService: OperadoraService,
    private administradoraService: AdministradoraService,
    private corretorService: CorretorService,
    private planoService: PlanoService,
    private anexoService: AnexoService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getOperadoras();

    this.getCorretores();

    this.dadosCadastro = this.formBuilder.group({
      dadosPessoais: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        nome: ['', [Validators.required, Validators.minLength(6)]],
        dataNascimento: ['', Validators.required],
        nomeResponsavel: [''],
        cpfResponsavel: ['',],
        telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
        email: ['', [Validators.required, Validators.email]],
        endereco: ['', Validators.required],
      }),
      dadosContratacao: this.formBuilder.group({
        corretorId: ['', Validators.required],
        operadoraId: ['', Validators.required],
        administradoraId: [''],
        vigencia: ['', [Validators.required]],
        planoId: ['', Validators.required],
        valorDoPlanoBruto: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        percentualComissao: ['', Validators.required],
        adesao: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        segmentacao: ['', Validators.required]
      }),
      dadosEspecificos: this.formBuilder.group({
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
      })
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

  getAdministradorasByOperadora() {
    this.administradoraService.listaAdministradorasByOperadora(this.dadosCadastro.get('dadosContratacao.operadoraId').value).subscribe(data => {
      this.administradoras = data;
    })
  }

  getPlanosByOperadora() {
    this.planoService.listaPlanosByOperadora(this.dadosCadastro.get('dadosContratacao.operadoraId').value).subscribe(data => {
      this.planos = data;
    });
  }

  onSubmit() {

    this.submitted = true;

    if (this.dadosCadastro.valid) {
      const dados = {
        dadosPessoaisSeguradoDTO: this.dadosCadastro.get('dadosPessoais').value,
        dadosParaContratacaoSeguradoDTO: this.dadosCadastro.get('dadosContratacao').value,
        dadosEspecificosCadastroClienteDTO: this.dadosCadastro.get('dadosEspecificos').value,
      };

      this.cadastraCliente(dados)
    }
  }

  cadastraCliente(dados: any) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja submeter esse formulário?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {

      if (result) {
        this.cadastroService.cadastrarCliente(dados).subscribe({
            next: (response) => {
                if (this.anexosSelecionados && this.anexosSelecionados.length > 0) {
                    this.enviarAnexos(this.anexosSelecionados, response.id);
                }
                
                this.toastr.success('Segurado cadastrado com sucesso.', 'Sucesso!');
                
                setTimeout(() => {
                  this.router.navigate(['/segurados']);
                }, 500); 
            },
            error: (err) => {
                console.error('Erro ao cadastrar cliente:', err);
                this.toastr.error('Ocorreu um erro ao cadastrar o segurado.', 'Erro!');
            }
        });
    }
    
    });

}
  enviarAnexos(anexosSelecionados: File[], clienteId: any) {
    const formData = new FormData();

    for (const file of anexosSelecionados) {
      formData.append('file', file);
    }

    this.anexoService.novoAnexo(clienteId, formData).subscribe();
  }

  onAnexosSelecionados(event: any): void {
    this.anexosSelecionados = event.target.files;
  }

  get dadosPessoaisField(): { [field: string]: AbstractControl } {
    return this.dadosCadastro.controls.dadosPessoais.controls;
  }

  get dadosContratacaoField(): { [field: string]: AbstractControl } {
    return this.dadosCadastro.controls.dadosContratacao.controls;
  }

  get dadosEspecificosField(): { [field: string]: AbstractControl } {
    return this.dadosCadastro.controls.dadosEspecificos.controls;
  }

}
