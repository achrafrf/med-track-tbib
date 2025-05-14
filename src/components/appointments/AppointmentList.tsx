
import { useLanguage } from "@/contexts/LanguageContext";
import AppointmentCard from "./AppointmentCard";

interface AppointmentListProps {
  appointments: Array<{
    id: number;
    patientName: string;
    date: string;
    time: string;
    status: string;
    type: string;
    notes: string;
  }>;
  onCancel: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore?: (id: number) => void;
}

const AppointmentList = ({ appointments, onCancel, onDelete, onRestore }: AppointmentListProps) => {
  const { t } = useLanguage();

  return (
    <>
      {appointments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {t("appointments.noAppointments")}
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={onCancel}
              onDelete={onDelete}
              onRestore={onRestore}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default AppointmentList;
