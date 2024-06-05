import { Component } from '@angular/core';
import { ListagemCadastroAdministradorasComponent } from './listagem-cadastro-administradoras/listagem-cadastro-administradoras.component';
import { ListagemCadastroCorretoresComponent } from './listagem-cadastro-corretores/listagem-cadastro-corretores.component';
import { ListagemCadastroOperadorasComponent } from './listagem-cadastro-operadoras/listagem-cadastro-operadoras.component';
import { ListagemAssociacaoOperadoraAdministradoraComponent } from './listagem-associacao-operadora-administradora/listagem-associacao-operadora-administradora.component';

@Component({
  selector: 'app-controle-administradoras-operadoras-corretores',
  standalone: true,
  imports: [ListagemCadastroAdministradorasComponent, ListagemCadastroCorretoresComponent, ListagemAssociacaoOperadoraAdministradoraComponent, ListagemCadastroOperadorasComponent],
  templateUrl: './controle-administradoras-operadoras-corretores.component.html',
  styleUrl: './controle-administradoras-operadoras-corretores.component.scss'
})
export class ControleAdministradorasOperadorasCorretoresComponent {

}
