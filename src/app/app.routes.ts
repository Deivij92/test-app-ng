import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {SolicitudesComponent} from "./pages/solicitudes-prestamos/solicitudes.component";
import {ListarPrestamosComponent} from "./pages/listar-prestamos/listar-prestamos.component";
import {ListarClientesComponent} from "./pages/listar-clientes/listar-clientes.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'radicar', component: SolicitudesComponent },
  { path: 'prestamos', component: ListarPrestamosComponent },
  { path: 'clientes', component: ListarClientesComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
