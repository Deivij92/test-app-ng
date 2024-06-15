import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/Cliente";
import {PrestamoDto} from "../../model/PrestamoDto";
import {ClienteService} from "../../service/cliente.service";

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent implements OnInit{

  clienteList : Cliente[] = [];
  constructor( private service : ClienteService) {
  }
  ngOnInit(): void {
    this.listarCleintes();
  }

  listarCleintes(){
    this.service.listarClientes().subscribe(
      (response: Cliente[]) => {
        if (response) {
          this.clienteList = response;
        } else {
          console.warn('No se recibieron líneas de crédito');
        }
      },
      error => {
        console.error('Error al listar las líneas de crédito', error);
      }
    );
  }

}
