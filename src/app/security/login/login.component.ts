import { provideHttpClient, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginObj: any = {
    "login" : "",
    "senha" : ""
  }

  constructor(private http:HttpClient, private router:Router){}

  onLogin(){
    // console.log('cu')
    // this.http.post('http://localhost:8080/auth/login', this.loginObj).subscribe((res:any)=>{
    //   if(res.result){
    //     localStorage.setItem("loginToken", res.token);
    //     alert('logado com sucesso')
    //     this.router.navigateByUrl('/');
    //   } else{
    //     alert('Usuario ou senha incorretos')
    //   }
    // })

  }
}
