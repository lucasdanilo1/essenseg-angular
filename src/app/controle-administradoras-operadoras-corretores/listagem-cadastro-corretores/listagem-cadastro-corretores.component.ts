import { Component, OnInit } from '@angular/core';
import { Corretor } from '../../models/corretor';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CorretorService } from '../../services/corretor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listagem-cadastro-corretores',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listagem-cadastro-corretores.component.html',
  styleUrl: './listagem-cadastro-corretores.component.scss'
})
export class ListagemCadastroCorretoresComponent implements OnInit {

  public corretores?: Corretor[];

  public corretorForm!: FormGroup;  

  constructor(private corretorService: CorretorService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    
    this.getOperadoras();

    this.corretorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', Validators.required]
    });

  }

  getOperadoras(){
    this.corretorService.listaCorretores().subscribe((resp) => {
      this.corretores = resp;
    })
  }

  onSubmit(){

    window.location.reload();

    const novoCorretor = this.corretorForm.value;
    
    this.corretorService.cadastrarCorretor(novoCorretor).subscribe(() => {

    })
  }

}
