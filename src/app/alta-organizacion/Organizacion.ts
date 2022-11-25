import { Fila } from "./Fila";

export class Organizacion {
    razon_social: string | undefined;
    tipoOrganizacion: string | undefined;
    clasificacionOrganizacion: string | undefined;
    x_pos: string | undefined;
    y_pos: string | undefined;
    sectores:Fila[] | undefined   
  };