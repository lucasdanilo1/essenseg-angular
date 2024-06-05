import { Component } from '@angular/core';
import { CardFiltrosComponent } from './components/card-filtros/card-filtros.component';

@Component({
  selector: 'app-listagem-segurados',
  standalone: true,
  imports: [CardFiltrosComponent, ListagemSeguradosComponent],
  templateUrl: './listagem-segurados.component.html',
  styleUrl: './listagem-segurados.component.scss'
})
export class ListagemSeguradosComponent {

}
