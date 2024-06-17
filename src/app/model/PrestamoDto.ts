export class PrestamoDto{
  idPrestamo?: number;
  monto?: number;
  plazo?: number; // en meses
  fechaDesembolso?: string; // usando string para simplicidad, puedes usar Date con más configuraciones
  fechaSolicitud?: string; // usando string para simplicidad, puedes usar Date con más configuraciones
  estadoSolicitud?: string; // Aprobado o no
  idlineaCredito?: string;
  idcliente?: string;
  descripcionCredito?: string;
}
