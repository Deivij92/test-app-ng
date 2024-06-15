import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/listar-ventas', title: 'Ventas realizadas',  icon:'fa fa-coins text-orange', class: '' },
  { path: '/listar-cajas', title: 'Caja chica',  icon:'fa fa-box text-blue', class: '' },
  { path: '/caja-general', title: 'Caja principal',  icon:'fa fa-boxes text-red', class: '' },
];
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  public isCollapsed = true;

  constructor(private router: Router) {

  }
  ngOnInit() {
  }
}
