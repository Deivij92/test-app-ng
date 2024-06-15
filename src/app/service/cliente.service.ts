import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Cliente} from "../model/Cliente";
import {ResponseDto} from "../model/ResponseDto";
import { Observable } from 'rxjs';
import {InfoLaboralClienteDto} from "../model/InfoLaboralClienteDto";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlBackEnd = 'http://localhost:9092/api/dinerofacil/';
  constructor(private http: HttpClient) {
  }

  crearCliente(request: Cliente): Observable<ResponseDto>{
    return this.http.post<ResponseDto>(this.urlBackEnd +'crear', request);
  }

  crearInfoLaboral(request: InfoLaboralClienteDto): Observable<ResponseDto>{
    debugger
    return this.http.post<ResponseDto>(this.urlBackEnd +'add-inf-lab', request);
  }

  crearReferencias(){

  }
}
