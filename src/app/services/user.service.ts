import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../models/PessoaUsuaria';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(private tokenService: TokenService) {
    if(this.tokenService.possuiToken()){
      this.decodeJWT();
    }
  }

  decodeJWT(){
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as PessoaUsuaria;
    this.userSubject.next(user)
  }

  retornarUser(){
    return this.userSubject.asObservable();
  }

  salvarToken(token: string){
    this.tokenService.salvarToken(token);
    this.decodeJWT();
  }

  logout(){
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado(){
    return this.tokenService.possuiToken();
  }

  getUserInfo(): any {
    const token = this.tokenService.retornarToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        nomeUsuario: payload.sub,
      };
    }
    return null;
  }

}
