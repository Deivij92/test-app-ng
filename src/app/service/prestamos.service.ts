import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LineaCreditoDto} from "../model/LineaCreditoDto";
import {HttpClient} from "@angular/common/http";
import {PrestamoDto} from "../model/PrestamoDto";
import {ResponseDto} from "../model/ResponseDto";

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {
  urlBackEnd = 'http://localhost:9092/api/dinerofacil/';
  constructor(private http: HttpClient) {
  }
  listarPrestamos(): Observable<LineaCreditoDto[]> {
    return this.http.post<LineaCreditoDto[]>(this.urlBackEnd + 'listarLineaCredito', null);
  }
  listarSolicitudes(): Observable<PrestamoDto[]>{
    return this.http.post<PrestamoDto[]>(this.urlBackEnd + 'prestamoslist', null);
  }

  solicitaPrestamo(request: PrestamoDto): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(this.urlBackEnd + 'prestamos', request);
  }
}
