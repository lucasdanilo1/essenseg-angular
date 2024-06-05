import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string = environment.api;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { }

  autenticar(login: string, senha: string): Observable<HttpResponse<AuthResponse>> {
    return this.httpClient.post<AuthResponse>(
      `${this.url}/auth/login`,
      { login, senha },
      { observe: 'response'}
    ).pipe(
      tap((response) => {
        const authToken = response.body?.token || '';
        this.userService.salvarToken(authToken);
      })
    );
  }
}
