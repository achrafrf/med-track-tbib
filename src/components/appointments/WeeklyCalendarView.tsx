
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentByDate {
  id: number;
  patientName: string;
  time: string;
  status: string;
  type: string;
}

interface WeeklyCalendarViewProps {
  date: Date | undefined;
  appointmentsByDate: Record<string, Array<AppointmentByDate>>;
}

const WeeklyCalendarView = ({ date, appointmentsByDate }: WeeklyCalendarViewProps) => {
  const { t } = useLanguage();
  
  // Generate calendar cells for current week
  const generateWeekDays = () => {
    const currentDate = date || new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start from Sunday
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      const dateString = dayDate.toISOString().split('T')[0];
      const appointmentsForDay = appointmentsByDate[dateString] || [];
      
      days.push(
        <div 
          key={i} 
          className={`p-2 border min-h-[150px] ${
            dayDate.toDateString() === new Date().toDateString() ? 'bg-blue-50' : ''
          }`}
        >
          <div className="text-right text-sm mb-1">
            {dayDate.getDate()}
          </div>
          <div className="space-y-1">
            {appointmentsForDay.map((app) => (
              <div 
                key={app.id}
                className={`p-1 text-xs rounded ${
                  app.status === 'confirmed' ? 'bg-green-100' :
                  app.status === 'pending' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}
              >
                <div className="font-medium truncate">{app.time} - {app.patientName}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };
  
  return (
    <div className="min-w-[800px]">
      <div className="grid grid-cols-7 gap-1">
        {/* Calendar headers */}
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
          <div key={index} className="p-2 text-center font-medium bg-gray-100 rounded-t-md">
            {t(`calendar.days.${day.toLowerCase()}`)}
          </div>
        ))}
        
        {/* Generate calendar cells for current week */}
        {generateWeekDays()}
      </div>
    </div>
  );
};

export default WeeklyCalendarView;
