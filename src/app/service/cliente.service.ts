import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cliente} from "../model/Cliente";
import {ResponseDto} from "../model/ResponseDto";
import { Observable } from 'rxjs';
import {InfoLaboralClienteDto} from "../model/InfoLaboralClienteDto";
import {ReferenciasDto} from "../model/ReferenciasDto";
import { LineaCreditoDto } from '../model/LineaCreditoDto';
import {PrestamoDto} from "../model/PrestamoDto";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBackEnd = 'http://localhost:9092/api/dinerofacil/';
  constructor(private http: HttpClient) {
  }
  crudClientes(request: Cliente): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(this.urlBackEnd +'cliente-crud', request);
  }

  InfoLabCrud(request: InfoLaboralClienteDto): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(this.urlBackEnd +'cliente-lab', request);
  }

  ReferenciasCrud(request: ReferenciasDto[]): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(this.urlBackEnd +'cliente-ref-crud', request);
  }
  updateInfoLaborar(request: InfoLaboralClienteDto): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(this.urlBackEnd + 'updateinfolab',request);
  }
  guardarReferencias(referencias: ReferenciasDto[]): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.urlBackEnd+ 'add-referencias', referencias);
  }

  obetnerInfoLaboral(idcliente:number | undefined): Observable<InfoLaboralClienteDto>{
    return this.http.get<InfoLaboralClienteDto>(`${this.urlBackEnd}${idcliente}/infoLaboral`);
  }
  obetnerReferencias(idcliente:number | undefined): Observable<ReferenciasDto[]>{
    return this.http.get<ReferenciasDto[]>(`${this.urlBackEnd}${idcliente}/referencias`);
  }
  obetnerPrestamos(idcliente:number | undefined): Observable<PrestamoDto[]>{
    return this.http.get<PrestamoDto[]>(`${this.urlBackEnd}${idcliente}/prestamos`);
  }
  obetnerInfoReferencias(idref:number | undefined): Observable<ReferenciasDto>{
    return this.http.get<ReferenciasDto>(`${this.urlBackEnd}referencia/${idref}`);
  }
  eliminarInfoCliente(idcliente:number | undefined): Observable<ResponseDto>{
    return this.http.delete<ResponseDto>(`${this.urlBackEnd}${idcliente}`);
  }
  eliminarInfoLab(idlab:number | undefined): Observable<ResponseDto>{
    return this.http.delete<ResponseDto>(`${this.urlBackEnd}${idlab}/laboral`);
  }
  eliminarInfoRef(idlab:number | undefined): Observable<ResponseDto>{
    return this.http.delete<ResponseDto>(`${this.urlBackEnd}${idlab}/laboral`);
  }
  eliminarReferencia(idRef: number| undefined): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(`${this.urlBackEnd}deleteref/${idRef}`);
  }
  actualizarReferencia(referencia: ReferenciasDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(`${this.urlBackEnd}updatereferencia`, referencia);
  }
}
