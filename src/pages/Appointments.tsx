
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDirectionAwareClassName } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock, FileText, Plus, Users } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";

// Import refactored components
import AppointmentForm from "@/components/appointments/AppointmentForm";
import AppointmentList from "@/components/appointments/AppointmentList";
import AppointmentCalendar from "@/components/appointments/AppointmentCalendar";
import QuickActions from "@/components/appointments/QuickActions";

export default function Appointments() {
  const { t } = useLanguage();
  const {
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
  } = useAppointments();

  // Quick Actions data
  const quickActions = [
    { 
      title: t("quickActions.todaySchedule"), 
      icon: <CalendarIcon className="h-4 w-4" />,
      action: () => {
        setDate(new Date());
        toast.success(t("quickActions.viewingTodaysSchedule"));
      }
    },
    { 
      title: t("quickActions.reports"), 
      icon: <FileText className="h-4 w-4" />,
      action: () => handleQuickAction(t("quickActions.reports"))
    },
    { 
      title: t("quickActions.reminders"), 
      icon: <Clock className="h-4 w-4" />,
      action: () => handleQuickAction(t("quickActions.reminders"))
    },
    { 
      title: t("quickActions.addPatient"), 
      icon: <Users className="h-4 w-4" />,
      action: () => handleQuickAction(t("quickActions.addPatient"))
    },
    { 
      title: t("quickActions.newPrescription"), 
      icon: <FileText className="h-4 w-4" />,
      action: () => handleQuickAction(t("quickActions.newPrescription"))
    },
  ];

  const handleQuickAction = (action: string) => {
    toast.info(`${action} action initiated`);
  };

  // RTL aware classes for layout
  const gridColsClass = getDirectionAwareClassName(
    "grid-cols-1 lg:grid-cols-3", 
    "grid-cols-1 lg:grid-cols-3"
  );
  
  const colSpanClass = getDirectionAwareClassName(
    "lg:col-span-2", 
    "lg:col-span-2"
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">{t("appointments.title")}</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <Plus className="h-4 w-4 mr-2" />
              {t("appointments.new")}
            </Button>
          </DialogTrigger>
          <AppointmentForm 
            setIsDialogOpen={setIsDialogOpen} 
            onAddAppointment={addAppointment} 
          />
        </Dialog>
      </div>
      
      <div className={`grid ${gridColsClass} gap-6`}>
        <Card className={colSpanClass}>
          <CardHeader>
            <CardTitle>{t("appointments.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="upcoming" className="flex-1">{t("tabs.upcoming")}</TabsTrigger>
                <TabsTrigger value="all" className="flex-1">{t("tabs.all")}</TabsTrigger>
                <TabsTrigger value="canceled" className="flex-1">{t("tabs.canceled")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                <AppointmentList 
                  appointments={displayedAppointments}
                  onCancel={cancelAppointment}
                  onDelete={deleteAppointment}
                />
              </TabsContent>
              
              <TabsContent value="all">
                <AppointmentList 
                  appointments={filteredAppointments}
                  onCancel={cancelAppointment}
                  onDelete={deleteAppointment}
                  onRestore={restoreAppointment}
                />
              </TabsContent>
              
              <TabsContent value="canceled">
                <AppointmentList 
                  appointments={displayedAppointments}
                  onCancel={cancelAppointment}
                  onDelete={deleteAppointment}
                  onRestore={restoreAppointment}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("calendar.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <AppointmentCalendar
                date={date}
                setDate={setDate}
                appointmentsByDate={appointmentsByDate}
                filteredAppointments={filteredAppointments}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActions actions={quickActions} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
