/** Illustrative records for the administration screens. No backend behind them. */

export type AdminOrder = {
  id: string;
  buyer: string;
  channel: "Familia" | "Escuela" | "Distribuidor";
  items: number;
  total: number;
  status: "Pagado" | "Por cotizar" | "Cotización enviada" | "En preparación" | "Enviado";
  date: string;
  state: string;
};

export const orders: AdminOrder[] = [
  { id: "SP-2419", buyer: "Colegio Miguel Hidalgo", channel: "Escuela", items: 186, total: 71640, status: "Cotización enviada", date: "05/09/2026", state: "Michoacán" },
  { id: "SP-2418", buyer: "Distribuidora Bajío Educativo", channel: "Distribuidor", items: 940, total: 318600, status: "En preparación", date: "05/09/2026", state: "Guanajuato" },
  { id: "SP-2417", buyer: "Ana Lucía Ramírez", channel: "Familia", items: 6, total: 2670, status: "Pagado", date: "04/09/2026", state: "CDMX" },
  { id: "SP-2416", buyer: "Instituto Cultural Morelos", channel: "Escuela", items: 240, total: 92400, status: "Por cotizar", date: "04/09/2026", state: "Morelos" },
  { id: "SP-2415", buyer: "Jorge Peña Ortega", channel: "Familia", items: 3, total: 1335, status: "Enviado", date: "03/09/2026", state: "Jalisco" },
  { id: "SP-2414", buyer: "Preparatoria Vasco de Quiroga", channel: "Escuela", items: 132, total: 58740, status: "Pagado", date: "02/09/2026", state: "Michoacán" },
  { id: "SP-2413", buyer: "Libros del Norte S.A.", channel: "Distribuidor", items: 620, total: 210800, status: "Enviado", date: "01/09/2026", state: "Nuevo León" },
];

export type AdminSchool = {
  id: string;
  name: string;
  city: string;
  level: string;
  students: number;
  contact: string;
  status: "Activa" | "En negociación" | "Renovación pendiente";
};

export const schools: AdminSchool[] = [
  { id: "ESC-101", name: "Colegio Miguel Hidalgo", city: "Morelia, Mich.", level: "Secundaria", students: 420, contact: "dirección@hidalgo.mx", status: "Activa" },
  { id: "ESC-102", name: "Instituto Cultural Morelos", city: "Cuernavaca, Mor.", level: "Secundaria y bachillerato", students: 610, contact: "compras@icm.edu.mx", status: "En negociación" },
  { id: "ESC-103", name: "Preparatoria Vasco de Quiroga", city: "Pátzcuaro, Mich.", level: "Bachillerato", students: 280, contact: "admin@pvq.edu.mx", status: "Activa" },
  { id: "ESC-104", name: "CBTis 148", city: "León, Gto.", level: "Bachillerato tecnológico", students: 1150, contact: "subdireccion@cbtis148.mx", status: "Renovación pendiente" },
  { id: "ESC-105", name: "Colegio Anáhuac del Valle", city: "CDMX", level: "Secundaria", students: 390, contact: "coordinacion@anahuacvalle.mx", status: "Activa" },
];

export type AdminDistributor = {
  id: string;
  name: string;
  region: string;
  states: string;
  activeOrders: number;
  discount: string;
};

export const distributors: AdminDistributor[] = [
  { id: "DIS-11", name: "Distribuidora Bajío Educativo", region: "Bajío", states: "Gto., Qro., Ags.", activeOrders: 4, discount: "38%" },
  { id: "DIS-12", name: "Libros del Norte S.A.", region: "Norte", states: "N.L., Coah., Tamps.", activeOrders: 2, discount: "40%" },
  { id: "DIS-13", name: "Ediciones del Pacífico", region: "Occidente", states: "Jal., Col., Nay.", activeOrders: 3, discount: "36%" },
  { id: "DIS-14", name: "Centro Escolar Sureste", region: "Sureste", states: "Yuc., Q. Roo, Camp.", activeOrders: 1, discount: "35%" },
];

export const adminMetrics = [
  { label: "Pedidos del mes", value: "312", detail: "+18% contra agosto" },
  { label: "Cotizaciones abiertas", value: "27", detail: "9 con más de 5 días" },
  { label: "Escuelas activas", value: "148", detail: "22 estados" },
  { label: "Accesos digitales liberados", value: "6 480", detail: "Ciclo 2026–2027" },
];
