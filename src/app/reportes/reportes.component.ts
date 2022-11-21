import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  public valorReporteId:string | undefined
  public valorOrganizacionId:string | undefined
  public valorSectorId:string | undefined
  public mostrarReporteEnPantalla:boolean=false
  public reporte:string | undefined

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  public cargarDatos(e:any) {
    console.log(e.id.toString());
    this.valorReporteId=e.id.toString();

  }


  public muestraOrganizacion(){
    if(this.valorReporteId=='imprimir-Composicion-HC') return true;  
    if(this.valorReporteId=='imprimirComposicionHC') return true;  
    if(this.valorReporteId=='imprimirEvolucionHCSector') return true;  
  
    return false;
  }

  public muestraSectores(){
    if(this.valorOrganizacionId!=null){
      if(this.valorReporteId=='imprimir-Composicion-HC') return true;  
      if(this.valorReporteId=='imprimirEvolucionHCSector') return true;  

    }
    return false;
  }

  public cargarDatosOrganizacion(e:any) {
    this.valorOrganizacionId  =e.id.toString();
  }
  public cargarDatosSector(e:any) {
    console.log(e.id.toString())
    this.valorSectorId  =e.id.toString();
  }

  public enviarPeticion(){
    
    if(this.valorReporteId=='imprimir-Composicion-HC'&& this.valorSectorId !=null) {
      console.log("peticion enviada");
      this.http.get('http://localhost:8080/imprimir-Composicion-HC/'+ this.valorSectorId )
      .pipe(map((res: any) => {     
        console.log(res);
        this.reporte=res;
        this.mostrarReporteEnPantalla=true;
      }))
      .subscribe(); 
    }
    
    if(this.valorReporteId=='imprimirComposicionHC'&& this.valorOrganizacionId !=null) {
      console.log("peticion enviada");
      this.http.get('http://localhost:8080/imprimirComposicionHC/'+ this.valorOrganizacionId )
      .pipe(map((res: any) => {     
        console.log(res);
        this.reporte=res;
        this.mostrarReporteEnPantalla=true;
      }))
      .subscribe(); 
    }
    
    if(this.valorReporteId=='imprimirTodoLosSectoresDeLaBaseDeDatos') {
      console.log("peticion enviada");
      this.http.get('http://localhost:8080/imprimirTodoLosSectores')
      .pipe(map((res: any) => {     
        console.log(res);
        this.reporte=res;
        this.mostrarReporteEnPantalla=true;
      }))
      .subscribe(); 
    }
    
    if(this.valorReporteId=='imprimirEvolucionHCSector'&& this.valorSectorId !=null) {
      console.log("peticion enviada");
      this.http.get('http://localhost:8080/imprimiverEvolucionSectorHC/'+ this.valorSectorId)
      .pipe(map((res: any) => {     
        console.log(res);
        this.reporte=res;
        this.mostrarReporteEnPantalla=true;
      }))
      .subscribe(); 
    }
    
    if(this.valorReporteId=='imprimirTodoLasOrganizacionesDeLaBaseDeDatosXPeriodicidadMensual') {
      console.log("peticion enviada");
      this.http.get('http://localhost:8080/imprimirTodoLasOrganizacionesDeLaBaseDeDatosXPeriodicidadMensual')
      .pipe(map((res: any) => {     
        console.log(res);
        this.reporte=res;
        this.mostrarReporteEnPantalla=true;
      }))
      .subscribe(); 
    }


    if(this.valorReporteId=='imprimirTodoLasOrganizacionesDeLaBaseDeDatosXPeriodicidadAnual') {
      console.log("peticion enviada");
      this.http.get('http://localhost:8080/imprimirTodoLasOrganizacionesDeLaBaseDeDatosXPeriodicidadAnual')
      .pipe(map((res: any) => {     
        console.log(res);
        this.reporte=res;
        this.mostrarReporteEnPantalla=true;
      }))
      .subscribe(); 
    }
  }


  public muestraReporte(){
      return this.mostrarReporteEnPantalla;
  }

  public cerrarReporte(){
      this.mostrarReporteEnPantalla=false
  }


}

