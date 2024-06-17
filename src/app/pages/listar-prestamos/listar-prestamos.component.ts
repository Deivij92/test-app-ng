import {Component, OnInit} from '@angular/core';
import {PrestamoDto} from "../../model/PrestamoDto";
import {LineaCreditoDto} from "../../model/LineaCreditoDto";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ClienteService} from "../../service/cliente.service";
import {PrestamosService} from "../../service/prestamos.service";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-listar-prestamos',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './listar-prestamos.component.html',
  styleUrl: './listar-prestamos.component.css'
})
export class ListarPrestamosComponent implements OnInit{
  listPrestamos : PrestamoDto[] = [];

  constructor(private servicePrestamos: PrestamosService) { }
  ngOnInit(): void {
   this.listarProductos();
  }

  listarProductos(): void {
    this.servicePrestamos.listarSolicitudes().subscribe(
      (response: PrestamoDto[]) => {
        if (response) {
          this.listPrestamos = response;
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
