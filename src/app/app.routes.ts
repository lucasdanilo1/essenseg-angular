import { Routes } from '@angular/router';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { LayoutComponent } from './layout/layout.component';
import { ListaSeguradosComponent } from './listagem-segurados/components/lista-segurados/lista-segurados.component';
import { ClienteDetalhadoComponent } from './cliente-detalhado/cliente-detalhado.component';
import { ControleAdministradorasOperadorasCorretoresComponent } from './controle-administradoras-operadoras-corretores/controle-administradoras-operadoras-corretores.component';
import { OperadoraDetalhadaComponent } from './operadora-detalhada/operadora-detalhada.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './core/interceptors/guards/auth.guard';

export const routes: Routes = [

     {
         path: '',
         component: LayoutComponent,
         children: [
            {path: 'cadastro/cliente', component: CadastroClienteComponent, canActivate: [authGuard]},
            {path: 'segurados', component: ListaSeguradosComponent, canActivate: [authGuard]},
            {path: 'segurados/cliente/:id', component: ClienteDetalhadoComponent, canActivate: [authGuard] },
            {path: 'controle', component: ControleAdministradorasOperadorasCorretoresComponent, canActivate: [authGuard]},
            {path: 'controle/operadora/:id', component: OperadoraDetalhadaComponent, canActivate: [authGuard]},
         ]
       },
       {
         path: 'login', component: LoginComponent
       }
       
            ];
