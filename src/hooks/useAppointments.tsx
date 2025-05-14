
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data
const initialAppointments = [
  {
    id: 1,
    patientName: "Ahmed Alami",
    date: "2025-05-13",
    time: "09:00",
    status: "confirmed",
    type: "Check-up",
    notes: "Regular check-up, patient has hypertension",
  },
  {
    id: 2,
    patientName: "Fatima Benali",
    date: "2025-05-13",
    time: "10:30",
    status: "confirmed",
    type: "Follow-up",
    notes: "Follow-up after medication change",
  },
  {
    id: 3,
    patientName: "Karim Tazi",
    date: "2025-05-13",
    time: "14:00",
    status: "canceled",
    type: "Consultation",
    notes: "New patient consultation",
  },
  {
    id: 4,
    patientName: "Leila Chraibi",
    date: "2025-05-14",
    time: "11:00",
    status: "confirmed",
    type: "Check-up",
    notes: "Annual physical examination",
  },
  {
    id: 5,
    patientName: "Omar Ziani",
    date: "2025-05-14",
    time: "15:30",
    status: "pending",
    type: "Follow-up",
    notes: "Follow-up for chronic condition",
  },
];

interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  status: string;
  type: string;
  notes: string;
}

interface NewAppointment {
  patientName: string;
  date: string;
  time: string;
  type: string;
  notes: string;
}

export const useAppointments = () => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter appointments based on the selected date
  const filteredAppointments = useMemo(() => {
    if (!date) return appointments;
    
    return appointments.filter(app => {
      const appDate = new Date(app.date);
      return (
        appDate.getDate() === date.getDate() &&
        appDate.getMonth() === date.getMonth() &&
        appDate.getFullYear() === date.getFullYear()
      );
    });
  }, [appointments, date]);
  
  // Filter appointments based on the selected tab
  const displayedAppointments = useMemo(() => {
    return filteredAppointments.filter(app => {
      if (selectedTab === "upcoming") {
        return app.status !== "canceled";
      } else if (selectedTab === "canceled") {
        return app.status === "canceled";
      }
      return true;
    });
  }, [filteredAppointments, selectedTab]);

  // Create an object to group appointments by date for the calendar
  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, Array<{
      id: number;
      patientName: string;
      time: string;
      status: string;
      type: string;
    }>> = {};
    
    appointments.forEach(app => {
      const appDate = app.date;
      if (!grouped[appDate]) {
        grouped[appDate] = [];
      }
      grouped[appDate].push({
        id: app.id,
        patientName: app.patientName,
        time: app.time,
        status: app.status,
        type: app.type,
      });
    });
    
    // Sort appointments by time for each date
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    return grouped;
  }, [appointments]);

  // Add a new appointment
  const addAppointment = (newAppointmentData: NewAppointment) => {
    const newId = appointments.length > 0 ? Math.max(...appointments.map(app => app.id)) + 1 : 1;
    
    const appointmentToAdd: Appointment = {
      id: newId,
      patientName: newAppointmentData.patientName,
      date: newAppointmentData.date,
      time: newAppointmentData.time,
      status: "confirmed",
      type: newAppointmentData.type,
      notes: newAppointmentData.notes,
    };
    
    setAppointments(prevAppointments => [...prevAppointments, appointmentToAdd]);
  };
  
  // Cancel an appointment
  const cancelAppointment = (id: number) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: "canceled" } : app)
    );
    toast.success(t("appointments.success.canceled"));
  };
  
  // Delete an appointment
  const deleteAppointment = (id: number) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
    toast.success(t("appointments.success.deleted"));
  };
  
  // Restore a canceled appointment
  const restoreAppointment = (id: number) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: "confirmed" } : app)
    );
    toast.success(t("appointments.success.restored"));
  };

  return {
    appointments,
    date,
    setDate,
    selectedTab,
    setSelectedTab,
    filteredAppointments,
    displayedAppointments,
    appointmentsByDate,
    isDialogOpen,
    setIsDialogOpen,
    addAppointment,
    cancelAppointment,
    deleteAppointment,
    restoreAppointment,
  };
};

export type AppointmentHookReturn = ReturnType<typeof useAppointments>;
