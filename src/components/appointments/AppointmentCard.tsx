
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AppointmentCardProps {
  appointment: {
    id: number;
    patientName: string;
    date: string;
    time: string;
    status: string;
    type: string;
    notes: string;
  };
  onCancel: (id: number) => void;
  onDelete: (id: number) => void;
  onRestore?: (id: number) => void;
}

const AppointmentCard = ({ appointment, onCancel, onDelete, onRestore }: AppointmentCardProps) => {
  const { t } = useLanguage();
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDelete = () => {
    if (appointmentToDelete !== null) {
      onDelete(appointmentToDelete);
    }
  };

  return (
    <div 
      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <div className="flex flex-col md:flex-row justify-between mb-2">
        <div className="font-medium">{appointment.patientName}</div>
        <div className="text-gray-500 text-sm">
          {formatDate(appointment.date)} • {appointment.time}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
            {t(`appointments.status.${appointment.status}`)}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t(`appointments.type.${appointment.type.toLowerCase().replace(/-/g, "")}`)}
          </span>
        </div>
        
        <div className="flex gap-2">
          {appointment.status !== "canceled" && (
            <>
              <Button variant="outline" size="sm">{t("appointments.reschedule")}</Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">{t("appointments.cancel")}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("appointments.confirmCancel")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("appointments.confirmCancelMessage")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("appointments.keep")}</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onCancel(appointment.id)}>
                      {t("appointments.confirmCancelButton")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
          
          {appointment.status === "canceled" && onRestore && (
            <Button variant="secondary" size="sm" onClick={() => onRestore(appointment.id)}>
              {t("appointments.restore")}
            </Button>
          )}
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="!text-red-600 border-red-200">
                {t("appointments.delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("appointments.confirmDelete")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("appointments.confirmDeleteMessage")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("appointments.cancelConfirm")}</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  setAppointmentToDelete(appointment.id);
                  handleDelete();
                }}>
                  {t("appointments.confirmDeleteButton")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      {appointment.notes && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{t("appointments.notes")}:</span> {appointment.notes}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
