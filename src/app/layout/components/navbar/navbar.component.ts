import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router, RouterModule } from '@angular/router';

import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  exitIcon = faArrowRightFromBracket;

  userData: any;

  constructor(
    private userService: UserService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.userData = this.userService.getUserInfo();
  }

  deslogar(){
    this.userService.logout()
    this.router.navigate(['/login'])
  }



}
