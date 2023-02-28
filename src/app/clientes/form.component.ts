import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import  swal  from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public titulo: String = "Crear Cliente";

  public cliente: Cliente = new Cliente();

  public errores: String [];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  
   create():void{
    this.clienteService.create(this.cliente).subscribe(
      {
        next : (cliente) => { 
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',` El cliente ${cliente.nombre} ha sido creado con exito!`,'success')

        },
        error: (e) => {
          this.errores = e.error.errors ;
          console.log(e)
          //console.log(this.errores)
          //console.error(err);
         console.error('Codigo del error desde el backend: ' + e.status);
        }     
      });
   }

   cargarCliente():void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente)
      }
    })
   }

   update():void{
    this.clienteService.update(this.cliente).subscribe(
      {next : (json) => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',` ${json.mensaje} : ${json.cliente.nombre}`,'success')
      },
      error: (e) => {
        this.errores = e.error.errors ;
        console.log(e)
        //console.log(this.errores)
        //console.error(err);
       console.error('Codigo del error desde el backend: ' + e.status);
      } 
      }
    )
   }

  
}
