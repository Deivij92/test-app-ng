import {Component, OnInit} from '@angular/core';
import {Cliente} from "../../model/Cliente";
import {PrestamoDto} from "../../model/PrestamoDto";
import {ClienteService} from "../../service/cliente.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InfoLaboralClienteDto} from "../../model/InfoLaboralClienteDto";
import {ResponseDto} from "../../model/ResponseDto";
import {ReferenciasDto} from "../../model/ReferenciasDto";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {LineaCreditoDto} from "../../model/LineaCreditoDto";
import {PrestamosService} from "../../service/prestamos.service";

@Component({
  selector: 'app-info-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './info-clientes.component.html',
  styleUrl: './info-clientes.component.css'
})
export class InfoClientesComponent implements OnInit{
  showAddLab :    boolean =  false;
  showTable :     boolean =  true;
  showTableRef :  boolean =  false;
  showTablePres:  boolean =  false;
  showAddCliente: boolean =  false;
  showARefInfo:   boolean =  false;
  showCredit:   boolean =  false;
  isReference:   boolean =  false;

  isLoading :     boolean =  false;
  isSave :        boolean =  false;
  mensajeInfo?: string ;
  validateInfoLab: boolean = false;

  cantReferencias: boolean = false;
  mensajecantidadRe?: string;
  lineaCreditList: LineaCreditoDto[] = [];
  referencias : ReferenciasDto[] = [];
  nuevaReferencia : ReferenciasDto[] = [];
  prestamos: PrestamoDto[] = [];
  idCliente : string | any;
  clienteInfo  = new Cliente();
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
  infoRefencia= new ReferenciasDto()
  prestamoDto: PrestamoDto = {
    idPrestamo: 0,
    monto: 0,
    plazo: 0,
    fechaDesembolso: '',
    fechaSolicitud: '',
    estadoSolicitud: '',
    idlineaCredito: '',
    idcliente: '',
    descripcionCredito: ''
  }

  clienteList : Cliente[] = [];
  constructor( private service : ClienteService,
               private servicePrestamo: PrestamosService) {
  }
  ngOnInit(): void {
    this.listarCleintes();
    this.listarLineaProductos();

  }
  listarCleintes(){
     const clientes =  new Cliente();
     clientes.actionType = "LIST_ALL"
    this.service.crudClientes(clientes).subscribe(
      (response: any) => {
        if (response.codeResponse === 200 && response.clienteDtoList && Array.isArray(response.clienteDtoList)) {
          this.clienteList = response.clienteDtoList;
        } else {
          console.warn('No se recibieron líneas de crédito');
        }
      },
      error => {
        console.error('Error al listar las líneas de crédito', error);
      }
    );
  }
  ObtenerInformacionLab(idcliente?: number){
    let dataSendInfoLab = new InfoLaboralClienteDto();
    let idCliente: number | undefined = idcliente;
    if (idCliente !== undefined) {
      this.idCliente = idCliente.toString();
    } else {
      console.log("El ID del cliente es undefined");
    }
    debugger
    dataSendInfoLab.actionType = "INFO-ID"
    dataSendInfoLab.idcliente = this.idCliente
    this.service.InfoLabCrud(dataSendInfoLab).subscribe(
      (data: any) =>{
        debugger
        if (data.codeResponse === 200 && data.infoLaboralClienteDto){
          this.infoLab = data.infoLaboralClienteDto
          this.validateInfoLab = true;
          this.showAddLab =  true;
          this.showTable =  false
        } else {
          this.validateInfoLab = false;
          this.showAddLab =  true;
          this.showTable =  false
        }
      },
      error => {
        console.error('Error al obtener la información laboral del cliente', error);
      }
    )
  }
  ObtenerInfoCliente(idcliente?: number){
    let dataSend = new Cliente();
    dataSend.actionType = "INFO-ID";
    dataSend.id = idcliente;
    debugger
    this.service.crudClientes(dataSend).subscribe((response: any) =>{
      if (response.codeResponse === 200 && response.clienteDto) {
        this.clienteInfo = response.clienteDto;
        this.showAddLab =  false;
        this.showTable =  false;
        this.showAddCliente =  true;
      }else {

      }
      },
      error => {
        console.error('Error al obtener la información laboral del cliente', error);
      }
    )
  }
  referencias2 : ReferenciasDto[] = [];
  ObtenerInfoReferencia(idcliente?: any){
    debugger
    const infoRef: any = {};
    infoRef.actionType = "INFO-ID"
    infoRef.idRef = idcliente.toString();
    this.referencias2.push(infoRef);
    this.service.ReferenciasCrud(this.referencias2).subscribe(
      (ref: any) =>{
        if(ref.codeResponse === 200 && ref.referenciasClientesDto){
          this.infoRefencia = ref.referenciasClientesDto;
          this.isReference = true
          this.showAddLab =  false;
          this.showTable =  false;
          this.showTableRef =  false;
          this.showAddCliente =  false;
          this.showARefInfo =  true;
        }
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
    dataSendInfoLab.actionType = "UPDATE";
    dataSendInfoLab.idcliente =  this.idCliente;
    this.service.InfoLabCrud(dataSendInfoLab).subscribe(
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
              location.reload()
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  referencias3 : ReferenciasDto[] = [];
  updateReferencias(request: any){
    debugger
    let dataSend = new ReferenciasDto();
    dataSend = request;
    dataSend.actionType = "UPDATE"
    this.referencias3.push(dataSend);
    this.service.ReferenciasCrud(this.referencias3).subscribe(
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
              this.showARefInfo = false
              this.isSave = false;
              location.reload()
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
    dataSend.actionType = "UPDATE";
    this.service.crudClientes(dataSend).subscribe(
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
              location.reload()
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  ElimianCliente(idcliente?: number){
    let dataSend = new Cliente();
    dataSend.actionType = "DELETE";
    dataSend.id = idcliente;
    this.service.crudClientes(dataSend).subscribe(
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
              location.reload()
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  ElimianInfoLab(idlab?: number){
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSendInfoLab.idInfoLab = idlab;
    dataSendInfoLab.actionType = "DELETE";
    debugger
    this.service.InfoLabCrud(dataSendInfoLab).subscribe(
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
              location.reload()
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  referencias4 : ReferenciasDto[] = [];
  ElimianRefer(idlab: any){
    const infoRef: any = {};
    infoRef.actionType = "DELETE"
    infoRef.idRef = idlab.toString();
    this.referencias4.push(infoRef);
    debugger
    this.service.ReferenciasCrud(this.referencias4).subscribe(
      (response: ResponseDto) =>{
        this.isLoading = true;
        this.isSave = true;
        this.mensajeInfo = 'Eliminando referencia...';
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
              location.reload()
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
        }, 3000);
      }
    )
  }
  referenciasList: ReferenciasDto[] = [];
  newReferencia =  new ReferenciasDto();
  listarRefrencias(idcliente: any): void {
   this.newReferencia.actionType = "LIST_ALL";
   this.newReferencia.idcliente = idcliente;
   this.idCliente = idcliente;
   this.referenciasList.push(this.newReferencia);
    this.service.ReferenciasCrud(this.referenciasList).subscribe(
      (data: any) => {
        if (data.codeResponse === 200 && data.referenciasClientesDtoList && Array.isArray(data.referenciasClientesDtoList)) {
            this.referencias = data.referenciasClientesDtoList;
            if (this.referencias.length < 4) {
              this.cantReferencias = true;
              this.mensajecantidadRe = 'Se ha listado ' + this.referencias.length + ' de 4, debes completarlas'
            } else {
              this.cantReferencias = false;
              this.mensajecantidadRe = 'Se ha listado ' + this.referencias.length + ' de 4, referencias'
            }
            this.showAddLab = false;
            this.showTable = false;
            this.showAddCliente = false;
            this.showTableRef = true;
        }else {
          this.cantReferencias = true;
          this.mensajecantidadRe = 'Se ha listado ' + this.referencias.length + ' de 4, debes completarlas'
          this.showAddLab = false;
          this.showTable = false;
          this.showAddCliente = false;
          this.showTableRef = true;
        }
      },
      error => {
        console.error('Error al obtener las referencias', error);
      }
    );
  }
  listarPrestamos(idcliente:any): void {
    this.idCliente = idcliente;
    this.service.obetnerPrestamos(idcliente).subscribe(
      (data: PrestamoDto[]) => {
        this.prestamos = data;
        this.showAddLab =  false;
        this.showTable =  false;
        this.showAddCliente =  false;
        this.showTablePres = true;
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
    dataSendInfoLab.actionType = "CREATE";
    dataSendInfoLab.idcliente = this.idCliente;
    debugger
    if (this.isFormValidLab()) {
      this.service.InfoLabCrud(dataSendInfoLab).subscribe(
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
  agregarReferencia() {
    debugger;
    this.infoRefencia.actionType = "CREATE";
    this.infoRefencia.idcliente = this.idCliente;
    this.nuevaReferencia.push(this.infoRefencia);
  }
  crearinfoRefencia(referencia: any) {
    debugger
    let dataSendInfoLab = new ReferenciasDto();
    dataSendInfoLab = referencia;
    if(this.ifForrmValidRef()){
    this.service.ReferenciasCrud(this.nuevaReferencia)
      .subscribe(
        (response: ResponseDto) => {
          this.isLoading = true;
          this.isSave = true;
          this.mensajeInfo = 'Guardando...';
          // Mostrar el mensaje por 8 segundos
          setTimeout(() => {
            if (response.codeResponse === 200) {
              this.mensajeInfo = response.messageResponse
              setTimeout(() => {
                this.isLoading = false;
                this.showAddLab = false;
                this.showTable = true
                this.showTableRef = false
                this.showARefInfo = false
                this.isSave = false;
                location.reload()
              }, 3000);
            } else {
              this.isLoading = false;
              this.isSave = true;
              this.mensajeInfo = response.messageResponse
            }
          }, 3000);
          console.log('Referencias guardadas en la base de datos:', this.referencias);
        },
        error => {
          this.isSave = true;
          this.mensajeInfo = error;
          console.error('Error al guardar referencias:', error);
          // Manejar el error según sea necesario
        }
      );
  }else {
        this.isSave = true;
        this.mensajeInfo = 'por favor valida que todos los campos esten diligenciados';
      }
  }
  cancelar(){
    location.reload()
  }
  addNewRefencia(){
    this.showTableRef = false,
      this.showARefInfo = true;
  }
  isFormValidLab(): boolean{
    return !!this.infoLab.telefono && !!this.infoLab.cargo && !!this.infoLab.direccion && !!this.infoLab.nitEmpresa &&
      !!this.infoLab.nombreEmpresa &&   !!this.infoLab.fechaVinculacion;
  }
  ifForrmValidRef(): boolean{
    return !!this.infoRefencia.parentezco && !!this.infoRefencia.nombresApellidos
      && !!this.infoRefencia.tipoDocumento && !!this.infoRefencia.numeroDocumento
      && !!this.infoRefencia.telefono && !!this.infoRefencia.ciudad
      && !!this.infoRefencia.residencia
  }
  ifFormSolCredito(): boolean{
    return !!this.prestamoDto.idlineaCredito && !!this.prestamoDto.monto && !!this.prestamoDto.plazo
      && !!this.prestamoDto.descripcionCredito;
  }
  listarLineaProductos(): void {
    this.servicePrestamo.listarPrestamos().subscribe(
      (response: LineaCreditoDto[]) => {
        if (response) {
          this.lineaCreditList = response;
        } else {
          console.warn('No se recibieron líneas de crédito');
        }
      },
      error => {
        console.error('Error al listar las líneas de crédito', error);
      }
    );
  }
  onSubmitSolicitudPrestamo(prestamoRequest: any) {
    debugger
    const fechaActual = new Date();
    const fechaSiguiente = new Date(fechaActual);
    fechaSiguiente.setDate(fechaActual.getDate() + 1);
    let dataSend = new PrestamoDto();
    dataSend = prestamoRequest;
    dataSend.idcliente =  this.idCliente;
    dataSend.fechaDesembolso = fechaSiguiente.toISOString().substring(0, 10);
    dataSend.estadoSolicitud = 'Aprobado - desembolsando';
    if (this.ifFormSolCredito()) {
      this.servicePrestamo.solicitaPrestamo(dataSend).subscribe(
        (response: ResponseDto) => {
          this.isLoading = true;
          this.isSave = true;
          this.mensajeInfo = 'En revisión y proceso de aprobación';

          // Mostrar el mensaje por 8 segundos
          setTimeout(() => {
            if (response.codeResponse === 200) {
              this.mensajeInfo = response.messageResponse + ' el desembolso se realizará al día siguiente';
              // Si la respuesta es exitosa, realizar otras acciones después de 5 segundos
              setTimeout(() => {
                this.isLoading = false;
                this.showAddLab = false;
                this.showCredit = true;
                this.isSave = false;
                this.isLoading = false;
                location.reload()
              }, 5000);
            } else {
              this.mensajeInfo = response.messageResponse;
            }
          }, 8000);
        },
        error => {
          this.isSave = true;
          this.mensajeInfo = 'Error al solicitar crédito: ' + error;
          console.error('Error al solicitar crédito: ', error);
        });
    }else {
      this.isSave = true;
      this.mensajeInfo = 'por favor valida que todos los campos esten diligenciados';
    }
  }
  ShowNuevoPrestamo(){
    this.showTablePres = false;
    this.showCredit = true;
  }
}
