import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {Cliente} from "../../model/Cliente";
import {ClienteService} from "../../service/cliente.service";
import { ResponseDto } from '../../model/ResponseDto';
import {InfoLaboralClienteDto} from "../../model/InfoLaboralClienteDto";
import {ReferenciasDto} from "../../model/ReferenciasDto";
import {PrestamosService} from "../../service/prestamos.service";
import {LineaCreditoDto} from "../../model/LineaCreditoDto";
import {PrestamoDto} from "../../model/PrestamoDto";

@Component({
  selector: 'app-solicitudes-prestamos',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit{
  form: FormGroup | undefined;
  clienteDto : Cliente = new Cliente();
  infoLab: InfoLaboralClienteDto =  new InfoLaboralClienteDto();
  referencias : ReferenciasDto[] = [];

  showAddCliente: boolean = true;
  showAddLab: boolean = false;
  showAddRef: boolean = false;
  showCredit: boolean =  false;
  isLoading: boolean = false;

  idCliente : string | any;

  isSave: boolean = false;
  mensajeInfo : string | undefined;

  lineaCreditList: LineaCreditoDto[] = [];
  requesPrestamo: PrestamoDto =  new PrestamoDto();
  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ClienteService,
              private servicePrestamos: PrestamosService) { }

  ngOnInit(): void {
    this.listarLineaProductos();
  }
  onSubmitCliente(cliente: any) {
    this.isLoading = true;
    let dataSend = new Cliente();
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSend = cliente
    if (this.isFormValidCliente()) {
      this.service.crearCliente(dataSend).subscribe(
        (response: ResponseDto) => {
          this.isLoading = true;
          this.isSave = true;
          this.mensajeInfo = 'Guardando... ';

          // Mostrar el mensaje por 8 segundos
          setTimeout(() => {
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
                this.isSave = false;
              }, 3000);
            } else {
              this.isSave = true;
              this.mensajeInfo = response.messageResponse
              console.log("No-Save: " + response.messageResponse);
            }
          }, 3000);
        },        (error) => {
          console.error('Error:', error);
        }
      );
     } else {
      this.isSave = true;
      this.mensajeInfo = 'por favor valida que todos los campos esten diligenciados';
    }
  }

  onSubmitLab(infoLaboral: any) {
    debugger
    let dataSend = new Cliente();
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
              this.showAddLab = false;
              this.showAddRef = true;
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


  mostrarBotonAgregar = true;
  mostrarBotonesGuardar = false;
  mostraMensajeRefCompletas = false;
  refCompletas = true;

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
    if (this.referencias.length === 0) {
      // Si es la primera referencia, inicializa el valor de idcliente
      this.nuevaReferencia.idcliente = this.idCliente; // Ajusta este valor según sea necesario
    }
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
    if (this.referencias.length === 4) {
      this.mostraMensajeRefCompletas =  true
      this.mostrarBotonAgregar = false;
      this.refCompletas = false;
      this.mostrarBotonesGuardar = true;
    }
  }
  onSubmitReferencias(event: any) {
    console.log('Guardando referencias:', this.referencias);
    if (this.referencias.length === 4) {
    this.service.guardarReferencias(this.referencias)
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
              this.showAddRef = false;
              this.showCredit = true;
              this.isSave = false;
            }, 3000);
          } else {
            this.isSave = true;
            this.mensajeInfo = response.messageResponse
          }
          }, 3000);
          console.log('Referencias guardadas en la base de datos:', this.referencias);
          this.referencias = [];
          this.mostrarBotonAgregar = false;
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
      this.servicePrestamos.solicitaPrestamo(dataSend).subscribe(
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
                this.showAddRef = false;
                this.showCredit = true;
                this.isSave = false;
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


  isFormValidCliente(): boolean {
    return !!this.clienteDto.tipoDocumento && !!this.clienteDto.numeroDocumento && !!this.clienteDto.apellidos &&
      !!this.clienteDto.residencia && !!this.clienteDto.ciudad && !!this.clienteDto.telefono && !!this.clienteDto.email

  }
  isFormValidLab(): boolean{
    return !!this.infoLab.telefono && !!this.infoLab.cargo && !!this.infoLab.direccion && !!this.infoLab.nitEmpresa &&
      !!this.infoLab.nombreEmpresa &&   !!this.infoLab.fechaVinculacion;
  }
  ifForrmValidRef(): boolean{
    return !!this.nuevaReferencia.parentezco && !!this.nuevaReferencia.nombresApellidos
      && !!this.nuevaReferencia.tipoDocumento && !!this.nuevaReferencia.numeroDocumento
      && !!this.nuevaReferencia.telefono && !!this.nuevaReferencia.ciudad
      && !!this.nuevaReferencia.residencia
  }

  listarLineaProductos(): void {
    this.servicePrestamos.listarPrestamos().subscribe(
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
  ifFormSolCredito(): boolean{
    return !!this.requesPrestamo.idlineaCredito && !!this.requesPrestamo.monto && !!this.requesPrestamo.plazo
      && !!this.requesPrestamo.descripcionCredito;
  }
}
