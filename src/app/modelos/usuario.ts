// src/app/modelos/usuario.ts
export interface Usuario {
  id?: string;

  nombres: string;
  apellidos: string;

  correo: string;
  password?: string;

  dni: string;
  telefono: string;

  rol: 'admin' | 'empleado';

  estado: boolean;

  foto?: string;

  createdAt?: any;
}

