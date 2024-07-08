import {Cliente} from "./Cliente";
import {InfoLaboralClienteDto} from "./InfoLaboralClienteDto";
import {ReferenciasDto} from "./ReferenciasDto";

export class ResponseDto{
  codeResponse? : number;
  messageResponse? : string;
  clienteId? : number;
  clienteDtoList? : Cliente[];
  clienteDto? : Cliente;
  infoLaboralClienteDto?: InfoLaboralClienteDto;
  referenciasClientesDtoList?: ReferenciasDto[];
  referenciasClientesDto?: ReferenciasDto;
}
