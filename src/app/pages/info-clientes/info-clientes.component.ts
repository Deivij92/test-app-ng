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
  infoRefencia: ReferenciasDto = {
    tipoDocumento: '',
    numeroDocumento: '',
    nombresApellidos: '',
    residencia: '',
    ciudad: '',
    telefono: '',
    parentezco: '',
    idcliente: '',
    idRef : 0
  };
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
  ObtenerInfoReferencia(idcliente: number | undefined){
    debugger
    this.service.obetnerInfoReferencias(idcliente).subscribe(
      (ref: ReferenciasDto) =>{
        this.infoRefencia = ref;
        this.showAddLab =  false;
        this.showTable =  false;
        this.showTableRef =  false;
        this.showAddCliente =  false;
        this.showARefInfo =  true;
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
  updateReferencias(request: any){
    debugger
    let dataSend = new ReferenciasDto();
    dataSend= request;
    this.service.actualizarReferencia(dataSend).subscribe(
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
  ElimianRefer(idlab: number | undefined){
    debugger
    this.service.eliminarReferencia(idlab).subscribe(
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
  listarRefrencias(idcliente:any): void {
    this.idCliente = idcliente;
    this.service.obetnerReferencias(idcliente).subscribe(
      (data: ReferenciasDto[]) => {
        this.referencias = data;
        if (this.referencias.length < 4){
          this.cantReferencias  = true;
          this.mensajecantidadRe = 'Se ha listado ' + this.referencias.length+' de 4, debes completarlas'
        }else {
          this.cantReferencias  = false;
          this.mensajecantidadRe = 'Se ha listado ' + this.referencias.length+' de 4, referencias'
        }
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
  agregarReferencia() {
    debugger;
    // Asegúrate de que `infoRefencia` tenga el campo `idcliente`
    this.infoRefencia.idcliente = this.idCliente;

    // Agrega la nueva referencia a la lista
    this.nuevaReferencia.push(this.infoRefencia);
  }
  crearinfoRefencia(referencia: any) {
    debugger
    let dataSendInfoLab = new ReferenciasDto();
    dataSendInfoLab = referencia;
    if(this.ifForrmValidRef()){
    this.service.guardarReferencias(this.nuevaReferencia)
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
