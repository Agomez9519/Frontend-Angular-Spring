import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { Cliente } from './cliente';/*
import { CLIENTES } from './clientes.json';
import { of } from 'rxjs';*/
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) { }

  getClientes() :Observable<Cliente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( res => res as Cliente[]) )
  }

  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente,{headers: this.httpHeaders}).pipe(
      map( (res: any) => res.cliente as Cliente),
      catchError(e=>{

        // if (e.status==400) {
        //   return throwError(() => new Error(e.error.errors));
        // }

        if (e.status==400) {
          return throwError(() => e);
          
        }

        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear al Cliente',
          text: e.error.error,
        })
        return throwError(() => e.error.mensaje);
      })
    );
  }

  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: e.error.mensaje,
        })
        this.router.navigate(['/clientes'])
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers:this.httpHeaders}).pipe(
      catchError(e=>{

        if (e.status==400) {
          return throwError(() => e);
          
        }

        
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar al Cliente',
          text: e.error.error,
        })
        return throwError(() => e.error.mensaje);
      })
    );
  }

  delete(id: number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        Swal.fire({
          icon: 'error',
          title: 'Error al Eliminar al Cliente',
          text: e.error.error,
        })
        return throwError(() => new Error(e.error.mensaje));
      })
    );;

  }




}
