import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes : Cliente[];

  constructor(private clienteService: ClienteService) { }

  getClientes(){
    this.clienteService.getClientes().subscribe(
      res => this.clientes = res
    );
  }

  delete(cliente:Cliente): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success btn-sm',
        cancelButton: 'btn btn-danger btn-sm'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `¿Seguro que desea eliminar a ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminalo!',
      cancelButtonText: 'No, Mejor no!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response =>{
              this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `El cliente ${cliente.nombre} ha sido eliminado.`,
              'success'
            )
          }
        )

      } 
    })
  }

  ngOnInit(): void {
     this.getClientes();
  }

}
