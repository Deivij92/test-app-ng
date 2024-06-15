import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {CrudClienteComponent} from "./pages/crud-cliente/crud-cliente.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CrudClienteComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
