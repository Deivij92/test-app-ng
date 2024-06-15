export class PrestamoDto{
  idPrestamo: number| undefined;
  monto: number| undefined;
  plazo: number| undefined; // en meses
  fechaDesembolso: string| undefined; // usando string para simplicidad, puedes usar Date con más configuraciones
  fechaSolicitud: string| undefined; // usando string para simplicidad, puedes usar Date con más configuraciones
  estadoSolicitud: string| undefined; // Aprobado o no
  idlineaCredito: string| undefined;
  idcliente: string| undefined;
  descripcionCredito: string| undefined;
}
