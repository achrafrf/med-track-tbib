
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar } from "@/components/ui/calendar";

interface AppointmentByDate {
  id: number;
  patientName: string;
  time: string;
  status: string;
  type: string;
}

interface AppointmentCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  appointmentsByDate: Record<string, Array<AppointmentByDate>>;
  filteredAppointments: Array<{
    id: number;
    patientName: string;
    date: string;
    time: string;
    status: string;
    type: string;
    notes: string;
  }>;
}

const AppointmentCalendar = ({ 
  date, 
  setDate, 
  appointmentsByDate,
  filteredAppointments
}: AppointmentCalendarProps) => {
  const { t } = useLanguage();

  // Calendar class based on screen size to make it larger
  const calendarClass = "rounded-md border pointer-events-auto min-h-[350px] md:min-h-[450px]";

  // Custom day renderer for the calendar to show appointment indicators and details
  const renderDay = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const appointmentsForDay = appointmentsByDate[dateString];
    
    if (!appointmentsForDay) return undefined;
    
    return (
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        {/* Display appointment dot indicators in the middle of day cells */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-center -mt-2">
          {appointmentsForDay.some(app => app.status === "confirmed") && (
            <div className="w-2 h-2 rounded-full mx-0.5 bg-green-500"></div>
          )}
          {appointmentsForDay.some(app => app.status === "pending") && (
            <div className="w-2 h-2 rounded-full mx-0.5 bg-yellow-500"></div>
          )}
          {appointmentsForDay.some(app => app.status === "canceled") && (
            <div className="w-2 h-2 rounded-full mx-0.5 bg-red-500"></div>
          )}
        </div>
      </div>
    );
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "border-l-green-500 bg-green-50";
      case "pending":
        return "border-l-yellow-500 bg-yellow-50";
      case "canceled":
        return "border-l-red-500 bg-red-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className={calendarClass}
        components={{
          Day: ({ date: day, ...props }) => {
            if (!day) return null;
            return (
              <div className="relative">
                <div {...props} />
                {renderDay(day)}
              </div>
            );
          }
        }}
      />
      
      {date && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            {t("calendar.selectedDate")}: {date.toLocaleDateString()}
          </h3>
          
          {/* Display appointments for selected date */}
          <div className="mt-2 space-y-2 max-h-[300px] overflow-auto">
            {filteredAppointments.length === 0 ? (
              <div className="text-sm text-gray-500">{t("calendar.noAppointments")}</div>
            ) : (
              filteredAppointments.map((appointment) => (
                <div 
                  key={appointment.id}
                  className={`p-2 rounded-md text-xs border-l-4 ${getStatusColor(appointment.status)}`}
                >
                  <div className="font-medium">{appointment.time} - {appointment.patientName}</div>
                  <div className="flex justify-between mt-1">
                    <span>{appointment.type}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {t(`appointments.status.${appointment.status}`)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentCalendar;
