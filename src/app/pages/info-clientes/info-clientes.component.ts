import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/Cliente";
import {PrestamoDto} from "../../model/PrestamoDto";
import {ClienteService} from "../../service/cliente.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfoLaboralClienteDto} from "../../model/InfoLaboralClienteDto";
import {ResponseDto} from "../../model/ResponseDto";
import {ReferenciasDto} from "../../model/ReferenciasDto";

@Component({
  selector: 'app-info-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './info-clientes.component.html',
  styleUrl: './info-clientes.component.css'
})
export class InfoClientesComponent implements OnInit{
  showAddLab : boolean =  false;
  showTable : boolean =  true;
  showTableRef : boolean =  false;
  showAddCliente: boolean =  false;
  isLoading : boolean =  false;
  isSave : boolean =  false;
  mensajeInfo?: string ;
  validateInfoLab: boolean = false;
  referencias : ReferenciasDto[] = [];
  idCliente : string | any;
  infoLab: InfoLaboralClienteDto = {
    idInfoLab: undefined,
    nitEmpresa: '',
    nombreEmpresa: '',
    direccion: '',
    telefono: '',
    cargo: '',
    fechaVinculacion: undefined,
    idcliente: '',
  };
  infoCliente: Cliente = {
    id: 0,                   // Id inicializado con 0
    tipoDocumento: '',       // Tipo de documento inicializado como cadena vacía
    numeroDocumento: '',     // Número de documento inicializado como cadena vacía
    apellidos: '',           // Apellidos inicializado como cadena vacía
    residencia: '',          // Residencia inicializado como cadena vacía
    ciudad: '',              // Ciudad inicializado como cadena vacía
    telefono: '',            // Teléfono inicializado como cadena vacía
    email: ''                 // Email inicializado como cadena vacía
  };

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
  ObtenerInformacionLab(idcliente: number | undefined){
    let idCliente: number | undefined = idcliente;
    if (idCliente !== undefined) {
      this.idCliente = idCliente.toString();
    } else {
      console.log("El ID del cliente es undefined");
    }
    debugger
    this.service.obetnerInfoLaboral(idcliente).subscribe(
      (data: InfoLaboralClienteDto) =>{
        this.infoLab = data
        if (!this.infoLab.idInfoLab) {
          this.validateInfoLab  = true;
          }
        this.showAddLab =  true;
        this.showTable =  false
      },
      error => {
        console.error('Error al obtener la información laboral del cliente', error);
      }
    )
  }
  ObtenerInfoCliente(idcliente: number | undefined){
    this.service.obetnerInfoCliente(idcliente).subscribe(
      (dataCliente: Cliente) =>{
        this.infoCliente = dataCliente;
        this.showAddLab =  false;
        this.showTable =  false;
        this.showAddCliente =  true;
      },
      error => {
        console.error('Error al obtener la información laboral del cliente', error);
      }
    )
  }
  updateInfoLaboral(request: any){
    debugger
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSendInfoLab = request;
    this.service.updateInfoLaborar(dataSendInfoLab).subscribe(
      (response: ResponseDto) =>{
        this.isLoading = true;
        this.isSave = true;
        this.mensajeInfo = 'Actualizando...';
        // Mostrar el mensaje por 8 segundos
        setTimeout(() => {
          if (response.codeResponse === 200) {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
            setTimeout(() => {
              this.isLoading = false;
              this.showTable =  true
              this.showAddLab = false;
              this.showAddCliente =  false
              this.isSave = false;
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  updateCliente(request: any){
    debugger
    let dataSend = new Cliente();
    dataSend = request;
    this.service.updateInfoCliente(dataSend).subscribe(
      (response: ResponseDto) =>{
        this.isLoading = true;
        this.isSave = true;
        this.mensajeInfo = 'Actualizando...';
        // Mostrar el mensaje por 8 segundos
        setTimeout(() => {
          if (response.codeResponse === 200) {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
            setTimeout(() => {
              this.isLoading = false;
              this.showTable =  true
              this.showAddLab = false;
              this.showAddCliente =  false
              this.isSave = false;
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  ElimianCliente(idcliente: number | undefined){
    debugger
    this.service.eliminarInfoCliente(idcliente).subscribe(
      (response: ResponseDto) =>{
        this.isLoading = true;
        this.isSave = true;
        this.mensajeInfo = 'Eliminando...';
        // Mostrar el mensaje por 8 segundos
        setTimeout(() => {
          if (response.codeResponse === 200) {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
            setTimeout(() => {
              this.isLoading = false;
              this.showTable =  true
              this.showAddLab = false;
              this.showAddCliente =  false
              this.isSave = false;
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  ElimianInfoLab(idlab: number | undefined){
    debugger
    this.service.eliminarInfoLab(idlab).subscribe(
      (response: ResponseDto) =>{
        this.isLoading = true;
        this.isSave = true;
        this.mensajeInfo = 'Eliminando...';
        // Mostrar el mensaje por 8 segundos
        setTimeout(() => {
          if (response.codeResponse === 200) {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
            setTimeout(() => {
              this.isLoading = false;
              this.showTable =  true
              this.showAddLab = false;
              this.showAddCliente =  false
              this.isSave = false;
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  obtenerReferencias(idcliente:any): void {
    this.service.obetnerReferencias(idcliente).subscribe(
      (data: ReferenciasDto[]) => {
        this.referencias = data;
        this.showAddLab =  false;
        this.showTable =  false;
        this.showAddCliente =  false;
        this.showTableRef = true;
      },
      error => {
        console.error('Error al obtener las referencias', error);
      }
    );
  }
  onSubmitLab(infoLaboral: any) {
    debugger
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSendInfoLab = infoLaboral;
    dataSendInfoLab.idcliente = this.idCliente;
    if (this.isFormValidLab()) {
      this.service.crearInfoLaboral(dataSendInfoLab).subscribe(
        (response: ResponseDto) => {
          this.isLoading = true;
          this.isSave = true;
          this.mensajeInfo = 'Guardando...';

          // Mostrar el mensaje por 8 segundos
          setTimeout(() => {
            if (response.codeResponse === 200) {
              this.isSave = true;
              this.mensajeInfo = response.messageResponse
              setTimeout(() => {
                this.isLoading = false;

                this.showAddLab =  false;
                this.showTable =  true;
                this.showAddCliente =  false;
                this.showTableRef = false;

                this.isSave = false;
              }, 3000);
            } else {
              this.isSave = true;
              this.mensajeInfo = response.messageResponse
            }
          }, 3000);
        },        (error) => {
          this.isSave = true;
          this.mensajeInfo = error;
        }
      );
    } else {
      this.isSave = true;
      this.mensajeInfo = 'por favor valida que todos los campos esten diligenciados';
    }
  }
  cancelar(){
    this.showTable =  true
    this.showAddLab = false;
    this.showAddCliente =  false
  }
  isFormValidLab(): boolean{
    return !!this.infoLab.telefono && !!this.infoLab.cargo && !!this.infoLab.direccion && !!this.infoLab.nitEmpresa &&
      !!this.infoLab.nombreEmpresa &&   !!this.infoLab.fechaVinculacion;
  }
}
