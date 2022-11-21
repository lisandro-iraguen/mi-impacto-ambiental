import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptaRechazaTrabajadorComponent } from './acepta-rechaza-trabajador/acepta-rechaza-trabajador.component';
import { AltaMiembreOrganizacionComponent } from './alta-miembre/alta-miembre-organizacion.component';
import { AltaOrganizacionComponent } from './alta-organizacion/alta-organizacion.component';
import { AltaTramoComponent } from './alta-tramo/alta-tramo.component';
import { AltaUsuarieComponent } from './alta-usuarie/alta-usuarie.component';
import { AltaZonaTrabajoComponent } from './alta-zona-trabajo/alta-zona-trabajo.component';
import { CalculadoraHCComponent } from './calculadora-hc/calculadora-hc.component';
import { EsperandoAprobacionComponent } from './esperando-aprobacion/esperando-aprobacion.component';
import { GuiaDeRecomendacionComponent } from './guia-de-recomendacion/guia-de-recomendacion.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecomendacionesVinculacionComponent } from './recomendaciones-vinculacion/recomendaciones-vinculacion.component';
import { RecomendacionesComponent } from './recomendaciones/recomendaciones.component';
import { RegistrarMedicionesComponent } from './registrar-mediciones/registrar-mediciones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VisualizarReporteComponent } from './visualizar-reporte/visualizar-reporte.component';


import { 
  AuthGuardService as AuthGuard 
} from './auth/auth-guard.service';
import { 
  RoleGuardService as RoleGuard 
} from './auth/role-guard.service';
import { SettingsComponent } from './settings/settings.component';
const routes: Routes = [
{
  path: '',
  component: LoginComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'sign-up',
  component: SignUpComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'usuarie',
  component: AltaUsuarieComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'settings',
  component: SettingsComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'admin',
  component: AltaMiembreOrganizacionComponent,
  canActivate: [AuthGuard]
},
{
  path: 'zona-trabajo',
  component: AltaZonaTrabajoComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'visualizar-reporte',
  component: VisualizarReporteComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'reportes',
  component: ReportesComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'trabajadores',
  component: AceptaRechazaTrabajadorComponent,
  canActivate: [AuthGuard],
  data: { 
     expectedRole: 'ADMIN'
  } 
},
{
  path: 'settings',
  component: SettingsComponent,
  canActivate: [AuthGuard],
  data: { 
     expectedRole: 'ADMIN'
   } 
},
{
  path: 'recomendaciones-vinculacion',
  component: RecomendacionesVinculacionComponent,
  canActivate: [RoleGuard], 
   data: { 
     expectedRole: 'ADMIN'
   } 
},
{
  path: 'recomendaciones',
  component: RecomendacionesComponent,
  canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMIN'
  } 
},
{
  path: 'tramo',
  component: AltaTramoComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'organizacion',
  component: AltaOrganizacionComponent,
  canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMIN'
  } 
},
{
  path: 'aprobacion',
  component: EsperandoAprobacionComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'home',
  component: HomeComponent,
  canActivate: [AuthGuard] 
},
{
  path: 'registrar-mediciones',
  component: RegistrarMedicionesComponent,
  canActivate: [RoleGuard], 
  data: { 
    expectedRole: 'ADMIN'
  } 
},
{
  path: 'calculadora-hc',
  component: CalculadoraHCComponent,  
  canActivate: [AuthGuard] 
},
{
  path: 'recomendacion',
  component: GuiaDeRecomendacionComponent,
  canActivate: [AuthGuard] 
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
