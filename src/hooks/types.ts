// src/hooks/types.ts

export interface AppointmentBase {
  patientName: string;
  date: string;       // بصيغة ISO أو 'YYYY-MM-DD'
  time: string;       // بصيغة 'HH:mm'
  type: string;
  notes: string;
}

// نستخدم type alias بدل interface فارغة
export type NewAppointment = AppointmentBase;

export interface Appointment extends AppointmentBase {
  id: number;
  status: string;  // مثل 'upcoming', 'canceled', 'completed'
}
