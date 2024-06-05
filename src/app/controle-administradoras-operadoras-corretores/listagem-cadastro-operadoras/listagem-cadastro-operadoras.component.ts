import { Component, OnInit } from '@angular/core';
import { OperadoraService } from '../../services/operadora.service';
import { Operadora } from '../../models/operadora.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem-cadastro-operadoras',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './listagem-cadastro-operadoras.component.html',
  styleUrl: './listagem-cadastro-operadoras.component.scss'
})
export class ListagemCadastroOperadorasComponent implements OnInit{

  public operadoras?: Operadora[];

  public operadoraForm!: FormGroup;

  eyeIcon = faEye;

  constructor(
    private operadoraService: OperadoraService, 
    private formBuilder: FormBuilder,
    private router: Router){}

  ngOnInit(): void {
    
    this.getOperadoras();

    this.operadoraForm = this.formBuilder.group({
      nome: ['', Validators.required]
    });
  }

  getOperadoras(){
    this.operadoraService.listaOperadoras().subscribe((resp) => {
      this.operadoras = resp;
    })
  }

  detalharOperadora(operadoraId: string) {
    this.router.navigate(['/controle/operadora/' + operadoraId]);
  }

  onSubmit(){

    window.location.reload();

    const novaOperadora = this.operadoraForm.value;
    
    this.operadoraService.cadastrarOperadora(novaOperadora).subscribe(() => {

    })
  }


}
