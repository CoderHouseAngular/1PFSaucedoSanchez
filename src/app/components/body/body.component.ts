import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  crudButtonText:string='Agregar';
  public displayedColumns!:string[];
  alumnos:Alumno[]=[
    {Matricula:12,Email:'example@example.com',Nombres:'Fulanita',Apellidos:'Doe',FechaNacimiento:new Date('1999/12/25'),Genero:'femenino',Activo:true},
    {Matricula:13,Email:'example2@example.com',Nombres:'Angel Eduardo',Apellidos:'Saucedo Sanchez',FechaNacimiento:new Date('2000/12/09'),Genero:'masculino',Activo:false}
  ];
  alumnosSource:MatTableDataSource<Alumno>=new MatTableDataSource<Alumno>(this.alumnos);
  alumnoData!: FormGroup;
  @ViewChild(MatTable) table!: MatTable<any>;
  constructor(@Inject(LOCALE_ID) private locale: string,private fb:FormBuilder,) { 
    this.alumnoData=fb.group({
      matricula:new FormControl(''),
      nombres:new FormControl('',[Validators.required]),
      apellidos:new FormControl('',[Validators.required]),
      fechaNacimiento:new FormControl(new Date('1990/01/01'),[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      genero:new FormControl('',[Validators.required]),
      activo:new FormControl(true),
    });
   
  }

  ngOnInit(): void {
    this.displayedColumns=['genero','nombre-completo','edad','email','activo','acciones'];
  }

  crudAlumno(){
    let matricula= this.alumnoData.get('matricula')?.value;
    console.log(matricula);
    if(matricula != '' && matricula != null){
      let alumno=this.alumnos.find(x=> x.Matricula==matricula);
      if(alumno!=null){
        alumno.Nombres= this.alumnoData.get('nombres')?.value;
        alumno.Apellidos= this.alumnoData.get('apellidos')?.value;
        alumno.FechaNacimiento= new Date(this.alumnoData.get('fechaNacimiento')?.value);
        alumno.Email= this.alumnoData.get('email')?.value;
        alumno.Genero= this.alumnoData.get('genero')?.value;
        alumno.Activo= this.alumnoData.get('activo')?.value;
      }

    }
    else{
      this.alumnos.push(
        {
          Matricula: this.alumnos.length > 0 ? this.alumnos[this.alumnos.length - 1].Matricula + 1 : 1,
          Nombres: this.alumnoData.get('nombres')?.value,
          Apellidos: this.alumnoData.get('apellidos')?.value,
          FechaNacimiento: new Date(this.alumnoData.get('fechaNacimiento')?.value),
          Email: this.alumnoData.get('email')?.value,
          Genero: this.alumnoData.get('genero')?.value,
          Activo: this.alumnoData.get('activo')?.value,
        }
      );
    }

    
    console.log(this.alumnos);
    this.table.renderRows();
    this.alumnoData.reset();
    this.crudButtonText='Agregar';
  }

  editAlumno(matricula:number){
    let alumno=this.alumnos.find(x=> x.Matricula==matricula)
    this.alumnoData.setValue({
      'matricula':alumno?.Matricula,
      'nombres':alumno?.Nombres,
      'apellidos':alumno?.Apellidos,
      'fechaNacimiento': formatDate(alumno!.FechaNacimiento, 'yyyy-MM-dd',this.locale),
      'email':alumno?.Email,
      'genero':alumno?.Genero ,
      'activo':alumno?.Activo ,
    });
    this.table.renderRows();
    this.crudButtonText='Editar';
  }

  deleteAlumno(matricula:number){
    let index=this.alumnos.findIndex(x=> x.Matricula==matricula);

    this.alumnos.splice(index,1);

    this.table.renderRows();
    this.alumnoData.reset();
    this.crudButtonText='Agregar';
  }

  calculateAge(fechaNacimiento: Date):string { 
    var ageDifMs = Date.now() - fechaNacimiento.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
}

}
