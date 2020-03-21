import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router){ }

  canActivate(){
    if(this.authService.getToken()==null){
      this.router.navigate(['/session/signin']);
      return false;
    }else{
      return true;
    }
  }
}
