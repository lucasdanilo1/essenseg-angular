import { Component, OnInit } from '@angular/core';
import { AdministradoraService } from '../../services/administradora.service';
import { Administradora } from '../../models/administradora';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-listagem-cadastro-administradoras',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './listagem-cadastro-administradoras.component.html',
  styleUrl: './listagem-cadastro-administradoras.component.scss'
})
export class ListagemCadastroAdministradorasComponent implements OnInit {

  public administradoras?: Administradora[];

  public administradoraForm!: FormGroup;

  constructor(private administradoraService: AdministradoraService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.getAdministradoras();

    this.administradoraForm = this.formBuilder.group({
      nome: [null, Validators.required]
    });
  }

  getAdministradoras(){
    this.administradoraService.listaAdministradoras().subscribe((resp) => {
      this.administradoras = resp;
    })
  }

  onSubmit(){

    window.location.reload();

    const novaAdministradora = this.administradoraForm.value;


    this.administradoraService.cadastrarAdministradora(novaAdministradora).subscribe(() => {
      
    })
  }

}
