import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Cliente} from "../../model/Cliente";
import {ClienteService} from "../../service/cliente.service";
import { ResponseDto } from '../../model/ResponseDto';
import {InfoLaboralClienteDto} from "../../model/InfoLaboralClienteDto";

@Component({
  selector: 'app-crud-cliente',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './crud-cliente.component.html',
  styleUrl: './crud-cliente.component.css'
})
export class CrudClienteComponent implements OnInit{
  form: FormGroup | undefined;
  clienteDto : Cliente = new Cliente();
  infoLab: InfoLaboralClienteDto =  new InfoLaboralClienteDto();

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ClienteService) { }

  ngOnInit(): void {
  }

  onSubmit(cliente: any, infoLaboral: any) {
    let dataSend = new Cliente();
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSend = cliente
    dataSendInfoLab = infoLaboral;
    if (this.isFormValidCliente()) {
      this.service.crearCliente(dataSend).subscribe(
        (response: ResponseDto) => {
          debugger
          if (response.codeResponse === 200) {
            let idCliente: number | undefined = response.clienteId;

            if (idCliente !== undefined) {
              let idClienteCadena: string = idCliente.toString();
              dataSendInfoLab.idcliente = idClienteCadena;
              console.log("ID del cliente como cadena:", idClienteCadena);

            } else {
              console.log("El ID del cliente es undefined");
            }
            this.service.crearInfoLaboral(dataSendInfoLab).subscribe(
              (response: ResponseDto) => {
                if (response.codeResponse === 200) {
                  console.log("Info Save: " + response.messageResponse);

                }else{
                  console.log("Error Save: " + response.messageResponse);
                }
              },
              (error) => {
                console.error('Error:', error);
              }
            );
          } else {
            console.log("No-Save: " + response.messageResponse);
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  isFormValidCliente(): boolean {
    return !!this.clienteDto.tipoDocumento && !!this.clienteDto.numeroDocumento && !!this.clienteDto.apellidos &&
      !!this.clienteDto.residencia && !!this.clienteDto.ciudad && !!this.clienteDto.telefono && !!this.clienteDto.email &&
      !!this.infoLab.telefono && !!this.infoLab.cargo && !!this.infoLab.direccion && !!this.infoLab.nitEmpresa &&  !!this.infoLab.nombreEmpresa &&   !!this.infoLab.fechaVinculacion
  }
  isFormValidInfoLaboral(): boolean{
    return !!this.infoLab.telefono && !!this.infoLab.cargo && !!this.infoLab.direccion && !!this.infoLab.nitEmpresa &&  !!this.infoLab.nombreEmpresa &&   !!this.infoLab.fechaVinculacion
  }

}
