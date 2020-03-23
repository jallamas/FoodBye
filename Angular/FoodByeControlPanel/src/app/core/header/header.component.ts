import * as Screenfull from 'screenfull';

import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()
  toggleNotificationSidenav = new EventEmitter<void>();

  constructor(private authService:AuthService, private router: Router) {}

  fullScreenToggle(): void {
    if (Screenfull.isEnabled) {
      Screenfull.toggle();
    }
  }

  logOut():void{
    this.authService.clearToken();
    this.router.navigate(['/session/signin'])
  }
}
