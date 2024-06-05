import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-botao-voltar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './botao-voltar.component.html',
  styleUrl: './botao-voltar.component.scss'
})
export class BotaoVoltarComponent {

  @Input() url: string = '';

  botaoVoltar = faLeftLong;

  constructor(private router: Router) {}

  voltar(): void {
    if (this.url == '') {
      window.history.back();
    } else {
      this.router.navigateByUrl(this.url).then(() => {
        window.location.reload();
      });
    }
  }
  

}
