import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate, getDirectionAwareClassName } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock, FileText, Plus, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

export default function Appointments() {
  const { t, language } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [appointments, setAppointments] = useState(initialAppointments);
  
  // Fixed: initialize with current date formatted as YYYY-MM-DD
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    date: formattedToday,
    time: "",
    type: "Consultation",
    notes: "",
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);
  
  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newId = appointments.length > 0 ? Math.max(...appointments.map(app => app.id)) + 1 : 1;
    
    const appointmentToAdd = {
      id: newId,
      patientName: newAppointment.patientName,
      date: newAppointment.date,
      time: newAppointment.time,
      status: "confirmed",
      type: newAppointment.type,
      notes: newAppointment.notes,
    };
    
    // Fix: Create a new array with the added appointment
    setAppointments(prevAppointments => [...prevAppointments, appointmentToAdd]);
    
    toast.success(t("appointments.success.scheduled"));
    setIsDialogOpen(false);
    
    // Reset form
    setNewAppointment({
      patientName: "",
      date: formattedToday,
      time: "",
      type: "Consultation",
      notes: "",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (value: string, name: string) => {
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCancel = (id: number) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: "canceled" } : app)
    );
    toast.success(t("appointments.success.canceled"));
  };
  
  const handleDelete = () => {
    if (appointmentToDelete !== null) {
      setAppointments(prev => prev.filter(app => app.id !== appointmentToDelete));
      setAppointmentToDelete(null);
      toast.success(t("appointments.success.deleted"));
    }
  };
  
  const handleRestore = (id: number) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: "confirmed" } : app)
    );
    toast.success(t("appointments.success.restored"));
  };

  const handleQuickAction = (action: string) => {
    toast.info(`${action} action initiated`);
  };
  
  // Filter appointments based on the selected date
  const filteredAppointments = appointments.filter(app => {
    if (!date) return true;
    
    const appDate = new Date(app.date);
    return (
      appDate.getDate() === date.getDate() &&
      appDate.getMonth() === date.getMonth() &&
      appDate.getFullYear() === date.getFullYear()
    );
  });
  
  // Filter appointments based on the selected tab
  const displayedAppointments = filteredAppointments.filter(app => {
    if (selectedTab === "upcoming") {
      return app.status !== "canceled";
    } else if (selectedTab === "canceled") {
      return app.status === "canceled";
    }
    return true;
  });
  
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

  // Create an object to group appointments by date for the calendar
  const appointmentsByDate = useMemo(() => {
    const grouped: Record<string, {count: number, hasConfirmed: boolean}> = {};
    appointments.forEach(app => {
      const appDate = app.date;
      if (!grouped[appDate]) {
        grouped[appDate] = { count: 0, hasConfirmed: false };
      }
      grouped[appDate].count += 1;
      if (app.status === "confirmed") {
        grouped[appDate].hasConfirmed = true;
      }
    });
    return grouped;
  }, [appointments]);

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

  // RTL aware classes for layout
  const gridColsClass = getDirectionAwareClassName(
    "grid-cols-1 lg:grid-cols-3", 
    "grid-cols-1 lg:grid-cols-3"
  );
  
  const colSpanClass = getDirectionAwareClassName(
    "lg:col-span-2", 
    "lg:col-span-2"
  );

  // Custom day renderer for the calendar to show appointment indicators
  const renderDay = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    const appointmentsForDay = appointmentsByDate[dateString];
    
    if (!appointmentsForDay) return undefined;
    
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-1">
          <div className={`w-1.5 h-1.5 rounded-full mx-0.5 ${appointmentsForDay.hasConfirmed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          {appointmentsForDay.count > 1 && (
            <div className="w-1.5 h-1.5 rounded-full mx-0.5 bg-blue-500"></div>
          )}
        </div>
      </div>
    );
  };

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
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{t("appointments.schedule")}</DialogTitle>
              <DialogDescription>
                {t("appointments.enterDetails")}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleNewAppointment} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="patientName">{t("appointments.patientName")}</Label>
                  <Input 
                    id="patientName" 
                    name="patientName"
                    value={newAppointment.patientName}
                    onChange={handleInputChange}
                    placeholder={t("appointments.patientName")}
                    required
                    className={language === "ar" ? "text-right" : ""}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">{t("appointments.date")}</Label>
                    <Input 
                      id="date" 
                      name="date"
                      type="date"
                      value={newAppointment.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time">{t("appointments.time")}</Label>
                    <Input 
                      id="time" 
                      name="time"
                      type="time"
                      value={newAppointment.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="type">{t("appointments.type")}</Label>
                  <Select 
                    value={newAppointment.type} 
                    onValueChange={(value) => handleSelectChange(value, "type")}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder={t("appointments.type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">{t("appointments.type.consultation")}</SelectItem>
                      <SelectItem value="Check-up">{t("appointments.type.checkup")}</SelectItem>
                      <SelectItem value="Follow-up">{t("appointments.type.followup")}</SelectItem>
                      <SelectItem value="Emergency">{t("appointments.type.emergency")}</SelectItem>
                      <SelectItem value="Procedure">{t("appointments.type.procedure")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">{t("appointments.notes")}</Label>
                  <Input 
                    id="notes" 
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    placeholder={t("appointments.notes")}
                    className={language === "ar" ? "text-right" : ""}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">{t("appointments.schedule.button")}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
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
              
              <TabsContent value="upcoming" className="space-y-4">
                {displayedAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">{t("appointments.noAppointments")}</div>
                ) : (
                  displayedAppointments.map((appointment) => (
                    <div 
                      key={appointment.id}
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
                                <AlertDialogAction onClick={() => handleCancel(appointment.id)}>
                                  {t("appointments.confirmCancelButton")}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          
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
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {filteredAppointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No appointments for the selected date</div>
                  ) : (
                    filteredAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-gray-500 text-sm">
                            {new Date(appointment.date).toLocaleDateString()} • {appointment.time}
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Reschedule</Button>
                            
                            {appointment.status !== "canceled" ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">Cancel</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to cancel this appointment? This action can be reversed later.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>No, keep it</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleCancel(appointment.id)}>
                                      Yes, cancel appointment
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : (
                              <Button variant="secondary" size="sm" onClick={() => handleRestore(appointment.id)}>
                                Restore
                              </Button>
                            )}
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="!text-red-600 border-red-200">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this appointment? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => {
                                    setAppointmentToDelete(appointment.id);
                                    handleDelete();
                                  }}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Notes:</span> {appointment.notes}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="canceled">
                <div className="space-y-4">
                  {displayedAppointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No canceled appointments for the selected date</div>
                  ) : (
                    displayedAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <div className="font-medium">{appointment.patientName}</div>
                          <div className="text-gray-500 text-sm">
                            {new Date(appointment.date).toLocaleDateString()} • {appointment.time}
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{appointment.type}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="secondary" 
                              size="sm"
                              onClick={() => handleRestore(appointment.id)}
                            >
                              Restore
                            </Button>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="!text-red-600 border-red-200">
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this appointment? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => {
                                    setAppointmentToDelete(appointment.id);
                                    handleDelete();
                                  }}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                        
                        {appointment.notes && (
                          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Notes:</span> {appointment.notes}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
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
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border pointer-events-auto"
                components={{
                  Day: ({ date: day, ...props }) => {
                    if (!day) return null;
                    return (
                      <div className="relative">
                        <div {...props} />
                        {renderDay(day)}
                      </div>
                    )
                  }
                }}
              />
              
              {date && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">{t("calendar.selectedDate")}: {date.toLocaleDateString()}</h3>
                  <div className="text-xs text-gray-500">
                    {filteredAppointments.length} {filteredAppointments.length === 1 ? t("calendar.appointment") : t("calendar.appointments")}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("quickActions.title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={action.action}
                >
                  {action.icon}
                  <span className="ml-2">{action.title}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
