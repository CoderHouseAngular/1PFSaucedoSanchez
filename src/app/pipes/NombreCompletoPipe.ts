import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../models/alumno';

@Pipe({ name: 'nombreCompleto' })
export class NombreCompletoPipe implements PipeTransform {
    transform(alumno: Alumno):string {
       return alumno.Nombres + ' ' + alumno.Apellidos;
    }
    
}