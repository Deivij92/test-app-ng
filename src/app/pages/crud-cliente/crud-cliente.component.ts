import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Cliente} from "../../model/Cliente";
import {ClienteService} from "../../service/cliente.service";
import { ResponseDto } from '../../model/ResponseDto';
import {InfoLaboralClienteDto} from "../../model/InfoLaboralClienteDto";
import {ReferenciasDto} from "../../model/ReferenciasDto";

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
  referencias : ReferenciasDto[] = [];
  showAddCliente: boolean = false;
  showAddLab: boolean = false;
  showAddRef: boolean = true;
  idCliente : string | any;
  isLoading: boolean = false;

  isSave: boolean = false;
  mensajeInfo : string | undefined;

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ClienteService) { }

  ngOnInit(): void {
  }

  onSubmitCliente(cliente: any) {
    this.isLoading = true;
    let dataSend = new Cliente();
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSend = cliente
    if (this.isFormValidCliente()) {
      this.service.crearCliente(dataSend).subscribe(
        (response: ResponseDto) => {
          if (response.codeResponse === 200) {
            this.isLoading = false;
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
            setTimeout(() => {
              this.isLoading = false;
              let idCliente: number | undefined = response.clienteId;
              if (idCliente !== undefined) {
                this.idCliente = idCliente.toString();
              } else {
                console.log("El ID del cliente es undefined");
              }
              this.showAddLab = true;
              this.showAddCliente = false;

            }, 5000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
            console.log("No-Save: " + response.messageResponse);
          }
        },        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  onSubmitLab(infoLaboral: any) {
    this.isSave = false;
    debugger
    let dataSend = new Cliente();
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSendInfoLab = infoLaboral;
    dataSendInfoLab.idcliente = this.idCliente;
    if (this.isFormValidLab()) {
      this.service.crearInfoLaboral(dataSendInfoLab).subscribe(
        (response: ResponseDto) => {
          debugger
          if (response.codeResponse === 200) {
            setTimeout(() => {
              this.isLoading = false;
              this.showAddLab = false
              this.showAddRef = true
            }, 5000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        },        (error) => {
          this.isSave = true;
          this.mensajeInfo = error;
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  onSubmitReferencias(referencias: any) {
    this.isSave = false;
    debugger
    let dataSend = new Cliente();
    let dataSendInfoRef = new ReferenciasDto();
    dataSendInfoRef = referencias;
    dataSendInfoRef.idcliente = this.idCliente;
    if (this.isFormValidLab()) {
      this.service.crearReferencias(dataSendInfoRef).subscribe(
        (response: ResponseDto) => {
          debugger
          if (response.codeResponse === 200) {
            setTimeout(() => {
              this.isLoading = false;
              this.showAddLab = false
              this.showAddRef = true
            }, 5000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        },        (error) => {
          this.isSave = true;
          this.mensajeInfo = error;
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  mostrarBotonAgregar = true;
  mostrarBotonesGuardar = false;

  nuevaReferencia: ReferenciasDto = {
    tipoDocumento: '',
    numeroDocumento: '',
    nombresApellidos: '',
    residencia: '',
    ciudad: '',
    telefono: '',
    parentezco: '',
    idcliente: undefined
  };

  agregarReferencia() {
    debugger
    // Aquí podrías agregar validaciones u otros procesamientos antes de agregar la referencia
    this.referencias.push(this.nuevaReferencia);
    // Limpia el objeto para prepararlo para la próxima entrada
    this.nuevaReferencia = {
      tipoDocumento: '',
      numeroDocumento: '',
      nombresApellidos: '',
      residencia: '',
      ciudad: '',
      telefono: '',
      parentezco: '',
      idcliente: this.idCliente
    };
    if (this.referencias.length === 3) {
      this.mostrarBotonAgregar = false;
      this.mostrarBotonesGuardar = true;
    }
  }
  isFormValidCliente(): boolean {
    return !!this.clienteDto.tipoDocumento && !!this.clienteDto.numeroDocumento && !!this.clienteDto.apellidos &&
      !!this.clienteDto.residencia && !!this.clienteDto.ciudad && !!this.clienteDto.telefono && !!this.clienteDto.email

  }
  isFormValidLab(): boolean{
    return !!this.infoLab.telefono && !!this.infoLab.cargo && !!this.infoLab.direccion && !!this.infoLab.nitEmpresa &&
      !!this.infoLab.nombreEmpresa &&   !!this.infoLab.fechaVinculacion;
  }
}
