import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RegistrarMedicionesComponent } from './registrar-mediciones/registrar-mediciones.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { CalculadoraHCComponent } from './calculadora-hc/calculadora-hc.component';
import {MatMenuModule} from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatCardModule} from '@angular/material/card';
import { RouteGaurd } from './route-guards';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AltaUsuarieComponent } from './alta-usuarie/alta-usuarie.component';
import {MatSelectModule} from '@angular/material/select';
import { AltaZonaTrabajoComponent } from './alta-zona-trabajo/alta-zona-trabajo.component';
import { EsperandoAprobacionComponent } from './esperando-aprobacion/esperando-aprobacion.component';
import { AceptaRechazaTrabajadorComponent } from './acepta-rechaza-trabajador/acepta-rechaza-trabajador.component';
import { RecomendacionesVinculacionComponent } from './recomendaciones-vinculacion/recomendaciones-vinculacion.component';
import { AltaTramoComponent } from './alta-tramo/alta-tramo.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AltaOrganizacionComponent } from './alta-organizacion/alta-organizacion.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ReportesComponent } from './reportes/reportes.component';
import { OrganizacionComponent } from './organizacion/organizacion.component';
import {HttpClientModule} from '@angular/common/http';
import { SectorComponent } from './sector/sector.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { GuiaDeRecomendacionComponent } from './guia-de-recomendacion/guia-de-recomendacion.component';
import { TipoComponent } from './tipo/tipo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisualizarReporteComponent } from './visualizar-reporte/visualizar-reporte.component';
import { AltaMiembreOrganizacionComponent } from './alta-miembre/alta-miembre-organizacion.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { ReporteComponent } from './reporte/reporte.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { MatTableModule } from '@angular/material/table'  
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { SettingsComponent } from './settings/settings.component';
import { MatSortModule } from '@angular/material/sort';
import { AltaSectorComponent } from './alta-sector/alta-sector.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegistrarMedicionesComponent,
    RecomendacionesComponent,
    CalculadoraHCComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    AltaUsuarieComponent,
    AltaMiembreOrganizacionComponent,
    AltaZonaTrabajoComponent,
    EsperandoAprobacionComponent,
    AceptaRechazaTrabajadorComponent,
    RecomendacionesVinculacionComponent,
    AltaTramoComponent,
    AltaOrganizacionComponent,
    VisualizarReporteComponent,
    ReportesComponent,
    OrganizacionComponent,
    SectorComponent,
    TrabajadorComponent,
    GuiaDeRecomendacionComponent,
    TipoComponent,
    ReporteComponent,
    SettingsComponent,
    AltaSectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSortModule
  ],
  providers: [RouteGaurd,AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
