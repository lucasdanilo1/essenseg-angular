import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OperadoraAdministradoraService } from '../../services/operadora-administradora.service';
import { RelacaoOperadoraAdministradora } from '../../models/operadora-administradora';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Operadora } from '../../models/operadora.model';
import { Administradora } from '../../models/administradora';
import { OperadoraService } from '../../services/operadora.service';
import { AdministradoraService } from '../../services/administradora.service';

@Component({
  selector: 'app-listagem-associacao-operadora-administradora',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listagem-associacao-operadora-administradora.component.html',
  styleUrl: './listagem-associacao-operadora-administradora.component.scss'
})
export class ListagemAssociacaoOperadoraAdministradoraComponent implements OnInit {

  public relacoes?: RelacaoOperadoraAdministradora[];

  public relacaoForm!: FormGroup;

  public operadoras!: Operadora[];

  public administradoras!: Administradora[];

  constructor(private operadoraAdministradoraService: OperadoraAdministradoraService,
    private operadoraService: OperadoraService,
    private administradoraService: AdministradoraService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {

  }

  ngOnInit(): void {

    this.relacaoForm = this.formBuilder.group({
      operadoraId: [null, Validators.required],
      administradoraId: [null],
    })

    this.getRelacoes();
    
    this.getOperadoras();

  }

  onSubmit() {
    this.operadoraAdministradoraService.fazerRelacao(this.relacaoForm.value).subscribe(() =>{
      this.refresh()
    });
  }

  getRelacoes() {
    this.operadoraAdministradoraService.obterListaSegurados().subscribe((resp) => {
      this.relacoes = resp;
    }
    )
  }

  getOperadoras() {
    this.operadoraService.listaOperadoras().subscribe(data => {
      this.operadoras = data;
    });
  }

  getAdministradorasNotRelatedToOperadora() {
    this.administradoraService.listaAdministradorasSemRelacaoComOperadora(this.relacaoForm.get('operadoraId')!.value).subscribe(data => {
      this.administradoras = data;
    })
  }

  refresh(): void {
    this.location.replaceState(this.location.path());
    window.location.reload();
  }

}
