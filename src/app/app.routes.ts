import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {SolicitudesComponent} from "./pages/solicitudes-prestamos/solicitudes.component";
import {ListarPrestamosComponent} from "./pages/listar-prestamos/listar-prestamos.component";
import {InfoClientesComponent} from "./pages/info-clientes/info-clientes.component";

export const routes: Routes = [
  { path: '', redirectTo: 'radicar', pathMatch: 'full' },
  { path: 'radicar', component: SolicitudesComponent },
  { path: 'prestamos', component: ListarPrestamosComponent },
  { path: 'clientes', component: InfoClientesComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
