import {Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {Router} from "@angular/router";
import {Cliente} from "../../model/Cliente";
import {ClienteService} from "../../service/cliente.service";
import {ResponseDto} from '../../model/ResponseDto';
import {InfoLaboralClienteDto} from "../../model/InfoLaboralClienteDto";
import {ReferenciasDto} from "../../model/ReferenciasDto";
import {PrestamosService} from "../../service/prestamos.service";
import {LineaCreditoDto} from "../../model/LineaCreditoDto";
import {PrestamoDto} from "../../model/PrestamoDto";

@Component({
  selector: 'app-solicitudes-prestamos',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.css'
})
export class SolicitudesComponent implements OnInit {
  form: FormGroup | any;
  formInfLabo: FormGroup | any;
  formRef: FormGroup | any;
  formCDT: FormGroup | any;

  emailValido: boolean = true;

  infoLab: InfoLaboralClienteDto = new InfoLaboralClienteDto();
  requesPrestamo: PrestamoDto = new PrestamoDto();
  clienteDto: Cliente = new Cliente();

  referencias: ReferenciasDto[] = [];

  showAddCliente: boolean = true;
  showAddLab: boolean = false;
  showAddRef: boolean = false;
  showCredit: boolean = false;
  isLoading: boolean = false;
  mostrarBotonAgregar = true;
  mostrarBotonesGuardar = false;
  mostraMensajeRefCompletas = false;
  refCompletas = true;
  idCliente: string | any;

  isSave: boolean = false;
  mensajeInfo: string | undefined;

  lineaCreditList: LineaCreditoDto[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ClienteService,
              private servicePrestamos: PrestamosService) {
  }

  ngOnInit(): void {
    this.listarLineaProductos();
    this.initClienteForm();
    this.initInfoLaboral();
    this.initReferencias();
    this.initCredit();
  }

  private initClienteForm() {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      apellidos: ['', Validators.required],
      residencia: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator()]], // Validador de email
    });
  }

  private initInfoLaboral() {
    this.formInfLabo = this.fb.group({
      nitEmpresa: ['', Validators.required],
      nombreEmpresa: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      cargo: ['', Validators.required],
      fechaVinculacion: ['', Validators.required]
    });
  }

  private initReferencias() {
    this.formRef = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      nombresApellidos: ['', Validators.required],
      residencia: ['', Validators.required],
      ciudad: ['', Validators.required],
      telefono: ['', Validators.required],
      parentezco: ['', Validators.required],
    });
  }

  private initCredit() {
    this.formCDT = this.fb.group({
      monto: ['', Validators.required],
      plazo: ['', Validators.required],
      idlineaCredito: ['', Validators.required],
      descripcionCredito: ['', [Validators.required]]
    });
  }

  onSubmitCliente(cliente: any) {
    debugger
    this.isLoading = true;
    let dataSend = new Cliente();
    dataSend = cliente
    dataSend.actionType = "CREATE"
    this.service.crudClientes(dataSend).subscribe(
      (response: ResponseDto) => {
        this.isLoading = true;
        this.isSave = true;
        this.mensajeInfo = 'Guardando... ';

        // Mostrar el mensaje por 8 segundos
        setTimeout(() => {
          debugger
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
            this.isLoading = false;
            this.isSave = true;
            this.mensajeInfo = response.messageResponse;
            console.log("No-Save: " + response.messageResponse);
          }
        }, 3000);
      }, (error) => {
        console.error('Error:', error);
      }
    );
  }

  onSubmitLab(infoLaboral: any) {
    debugger
    let dataSend = new Cliente();
    let dataSendInfoLab = new InfoLaboralClienteDto();
    dataSendInfoLab = infoLaboral;
    dataSendInfoLab.idcliente = this.idCliente;
    dataSendInfoLab.actionType = "CREATE";
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
              this.showAddLab = false;
              this.showAddRef = true;
              this.isSave = false;
            }, 3000);
          } else {
            this.isLoading = false;
            this.isSave = true;
            this.mensajeInfo = response.messageResponse + ' Dirigete a la seccion de clientes donde podras retomar la solcitud';
          }
        }, 3000);
      }, (error) => {
        this.isSave = true;
        this.mensajeInfo = error;
      }
    );
  }

  nuevaReferencia: ReferenciasDto = {
    actionType: '',
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
    // Si es la primera referencia, inicializa el valor de idcliente
    if (this.referencias.length === 0) {
      this.nuevaReferencia.idcliente = this.idCliente; // Ajusta este valor según sea necesario
    }
    this.nuevaReferencia.actionType = "CREATE";
    // Contar cuántas referencias con cada parentesco existen
    const amigosCount = this.referencias.filter(ref => ref.parentezco === 'amigo').length;
    const otrsCount = this.referencias.filter(ref => ref.parentezco !== 'amigo').length;
    const mamaCount = this.referencias.filter(ref => ref.parentezco === 'mama').length;
    const papaCount = this.referencias.filter(ref => ref.parentezco === 'papa').length;

    // Verificar si ya hay dos referencias con parentesco "amigo"
    if (this.nuevaReferencia.parentezco === 'amigo' && amigosCount >= 2) {
      alert('Solo puedes agregar dos referencias con el parentesco "Amigo".');
    } else if (this.nuevaReferencia.parentezco !== 'amigo' && otrsCount >= 2) {
      alert('Solo puedes agregar dos referencias Familiares.');
    } else if (this.nuevaReferencia.parentezco === 'mama' && mamaCount >= 1) {
      alert('Solo puedes agregar una referencia con el parentesco "Mamá".');
    } else if (this.nuevaReferencia.parentezco === 'papa' && papaCount >= 1) {
      alert('Solo puedes agregar una referencia con el parentesco "Papá".');
    } else {
      // Agregar la nueva referencia solo si no excede los límites establecidos
      this.referencias.push(this.nuevaReferencia);

      // Limpiar el objeto para prepararlo para la próxima entrada
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

      // Verificar si se han completado las referencias requeridas
      if (this.referencias.length === 4) {
        this.mostraMensajeRefCompletas = true;
        this.mostrarBotonAgregar = false;
        this.refCompletas = false;
        this.mostrarBotonesGuardar = true;
      }
    }
  }

  onSubmitReferencias(event: any) {
    console.log('Guardando referencias:', this.referencias);
    if (this.referencias.length === 4) {
      this.service.ReferenciasCrud(this.referencias)
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
                this.refCompletas = true;
                this.isLoading = false;
                this.isSave = true;
                this.mostrarBotonesGuardar = false;
                this.mostrarBotonAgregar = true;
                this.mensajeInfo = response.messageResponse + ' Dirigete a la seccion de clientes donde podras retomar la solcitud';
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
    } else {
      this.isSave = true;
      this.mensajeInfo = 'Por favor valida las 4 referencias esten agregadas. ';
    }
  }

  onSubmitSolicitudPrestamo(prestamoRequest: any) {
    debugger
    const fechaActual = new Date();
    const fechaSiguiente = new Date(fechaActual);
    fechaSiguiente.setDate(fechaActual.getDate() + 1);
    let dataSend = new PrestamoDto();
    dataSend = prestamoRequest;
    dataSend.idcliente = this.idCliente;
    dataSend.fechaDesembolso = fechaSiguiente.toISOString().substring(0, 10);
    dataSend.estadoSolicitud = 'Aprobado - desembolsando';
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
              this.router.navigate(['/prestamos'])
            }, 5000);
          } else {
            this.isLoading = false;
            this.mensajeInfo = response.messageResponse + ' Dirigete a la seccion de clientes donde podras retomar la solcitud';
          }
        }, 8000);
      },
      error => {
        this.isSave = true;
        this.mensajeInfo = 'Error al solicitar crédito: ' + error;
        console.error('Error al solicitar crédito: ', error);
      });
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
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const valid = emailRegexp.test(control.value);
      return valid ? null : {email: true};
    };
  }
  pageListCustomer(){
    this.router.navigate(['clientes'])
  }
}
