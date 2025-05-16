import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AppointmentByDate {
  id: number;
  patientName: string;
  time: string;
  status: string;
  type: string;
  phone?: string;
  doctor?: string;
  notes?: string;
}

interface AppointmentCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  appointmentsByDate: Record<string, Array<AppointmentByDate>>;
  filteredAppointments: Array<AppointmentByDate & { date: string }>;
}

const AppointmentCalendar = ({
  date,
  setDate,
  appointmentsByDate,
  filteredAppointments,
}: AppointmentCalendarProps) => {
  const { t } = useLanguage();
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentByDate | null>(null);
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");

  const statusColor = {
    confirmed: "bg-green-100 border-l-green-500 text-green-800",
    pending: "bg-yellow-100 border-l-yellow-500 text-yellow-800",
    canceled: "bg-red-100 border-l-red-500 text-red-800",
    failed: "bg-gray-200 border-l-gray-500 text-gray-700",
  };

  const goToNext = () => {
    if (!date) return;
    const newDate = new Date(date);
    if (viewMode === "day") newDate.setDate(newDate.getDate() + 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() + 7);
    else newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  const goToPrev = () => {
    if (!date) return;
    const newDate = new Date(date);
    if (viewMode === "day") newDate.setDate(newDate.getDate() - 1);
    else if (viewMode === "week") newDate.setDate(newDate.getDate() - 7);
    else newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const getDateKey = (d: Date) => d.toISOString().split("T")[0];

  const renderMonthView = () => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = date.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const startDay = startOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
// eslint-disable-next-line prefer-const
let currentDay = new Date(year, month, 1 - startDay);
    for (let i = 0; i < 6 * 7; i++) {
      const dayKey = getDateKey(currentDay);
      const dayAppointments = appointmentsByDate[dayKey] || [];

      cells.push(
        <div key={i} className="p-1 border h-24 bg-white text-xs">
          <div className="text-right text-gray-500 font-semibold">{currentDay.getDate()}</div>
          {dayAppointments.slice(0, 2).map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedAppointment(a)}
              className={`truncate cursor-pointer text-[11px] px-1 rounded border-l-4 mt-1 ${statusColor[a.status as keyof typeof statusColor]}`}
            >
              {a.time} - {a.patientName}
            </div>
          ))}
        </div>
      );
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return (
      <div className="grid grid-cols-7 border text-center text-sm font-semibold bg-gray-100">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="p-2 border-b">
            {d}
          </div>
        ))}
        {cells}
      </div>
    );
  };

  const renderWeekView = () => {
    const start = new Date(date!);
    start.setDate(start.getDate() - start.getDay());

    return (
      <>
        {/* Week Header */}
        <div className="grid grid-cols-8 text-xs font-semibold text-gray-700 border-b pb-2 mb-2">
          <div></div>
          {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
            const current = new Date(start);
            current.setDate(start.getDate() + offset);
            const dateStr = current.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
            });

            return (
              <div key={offset} className="text-center">
                {dateStr}
              </div>
            );
          })}
        </div>

        {/* Time slots */}
        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
          <div key={hour} className="grid grid-cols-8 text-xs border-t min-h-[80px]">
            <div className="text-right pr-2 pt-2 font-medium text-gray-400">
              {hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`}
            </div>
            {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
              const d = new Date(start);
              d.setDate(d.getDate() + offset);
              const dateKey = getDateKey(d);
              const slotTime = `${hour.toString().padStart(2, "0")}:00`;
              const a = appointmentsByDate[dateKey]?.find((a) => a.time.startsWith(slotTime));
              return (
                <div key={offset} className="p-1 border-l border-gray-100 hover:bg-gray-50">
                  {a ? (
                    <div
                      onClick={() => setSelectedAppointment(a)}
                      className={`p-1 rounded-md border-l-4 cursor-pointer text-[11px] ${statusColor[a.status as keyof typeof statusColor]}`}
                    >
                      <div className="font-semibold">{a.time}</div>
                      <div>{a.patientName}</div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            onClick={() => setViewMode("day")}
            className={cn("px-3 py-1 border rounded", viewMode === "day" && "bg-black text-white")}
          >
            Day
          </button>
          <button
            onClick={() => setViewMode("week")}
            className={cn("px-3 py-1 border rounded", viewMode === "week" && "bg-black text-white")}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={cn("px-3 py-1 border rounded", viewMode === "month" && "bg-black text-white")}
          >
            Month
          </button>
        </div>
        <div className="space-x-4">
          <button onClick={goToPrev} className="text-sm font-medium text-blue-600">← prev</button>
          <span className="font-bold">{date?.toLocaleDateString()}</span>
          <button onClick={goToNext} className="text-sm font-medium text-blue-600"> next →</button>
        </div>
      </div>

      <section className="bg-white rounded-md border p-4">
        {viewMode === "month" ? renderMonthView() : renderWeekView()}
      </section>

      {viewMode === "day" && date && (
        <div className="mt-6">
          <h3 className="text-base font-semibold mb-3">
            {t("calendar.selectedDate")}: {date.toLocaleDateString()}
          </h3>
          <div className="space-y-3 max-h-[300px] overflow-auto">
            {filteredAppointments.length === 0 ? (
              <div className="text-sm text-gray-500">{t("calendar.noAppointments")}</div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  onClick={() => setSelectedAppointment(appointment)}
                  className={`p-3 rounded-md text-sm cursor-pointer hover:shadow border-l-4 ${statusColor[appointment.status as keyof typeof statusColor]}`}
                >
                  <div className="font-medium">
                    {appointment.time} - {appointment.patientName}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>{appointment.type}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white border">
                      {t(`appointments.status.${appointment.status}`)}
                    </span>
                  </div>
                  {appointment.notes && (
                    <div className="mt-1 text-xs italic text-gray-600">{appointment.notes}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("appointments.details")}</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="text-sm space-y-2">
              <div><strong>{t("appointments.patient")}:</strong> {selectedAppointment.patientName}</div>
              <div><strong>{t("appointments.time")}:</strong> {selectedAppointment.time}</div>
              <div><strong>{t("appointments.status")}:</strong> {t(`appointments.status.${selectedAppointment.status}`)}</div>
              {selectedAppointment.phone && <div><strong>{t("appointments.phone")}:</strong> {selectedAppointment.phone}</div>}
              {selectedAppointment.doctor && <div><strong>{t("appointments.doctor")}:</strong> {selectedAppointment.doctor}</div>}
              {selectedAppointment.notes && <div><strong>{t("appointments.notes")}:</strong> {selectedAppointment.notes}</div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentCalendar;
