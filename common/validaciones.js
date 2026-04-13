export const nombreUsuarioRegEx = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,80}$/;
export const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const claveRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
export const telefonoRegEx = /^\+?[0-9\s]{9,15}$/;
export const nombreComercioRegEx = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-\&]{2,60}$/;
export const direccionRegEx = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\,\.\-\º\ª]{5,120}$/;
export const descripcionRegEx = /^[\s\S]{10,500}$/;

