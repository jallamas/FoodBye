import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MenuService {

  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      {
        link: '/inicio',
        label: this.translate.instant('Inicio'),
        icon: 'home'
      },
      {
        link: '/usuarios',
        label: this.translate.instant('Usuarios'),
        externalRedirect: true,
        icon: 'group'
      },
      {
        link: '/pedidos',
        label: this.translate.instant('Pedidos'),
        externalRedirect: true,
        icon: 'assignment'
      }
    ];
  }
}
