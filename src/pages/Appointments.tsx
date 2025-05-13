
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
import { useState } from "react";
import { toast } from "sonner";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [appointments, setAppointments] = useState(initialAppointments);
  
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    date: "",
    time: "",
    type: "Consultation",
    notes: "",
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);
  
  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New appointment:", newAppointment);
    
    const newId = Math.max(...appointments.map(app => app.id)) + 1;
    
    setAppointments(prev => [
      ...prev,
      {
        id: newId,
        patientName: newAppointment.patientName,
        date: newAppointment.date,
        time: newAppointment.time,
        status: "confirmed",
        type: newAppointment.type,
        notes: newAppointment.notes,
      }
    ]);
    
    toast.success("Appointment scheduled successfully!");
    setIsDialogOpen(false);
    
    // Reset form
    setNewAppointment({
      patientName: "",
      date: "",
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
    toast.success("Appointment canceled successfully!");
  };
  
  const handleDelete = () => {
    if (appointmentToDelete !== null) {
      setAppointments(prev => prev.filter(app => app.id !== appointmentToDelete));
      setAppointmentToDelete(null);
      toast.success("Appointment deleted successfully!");
    }
  };
  
  const handleRestore = (id: number) => {
    setAppointments(prev => 
      prev.map(app => app.id === id ? { ...app, status: "confirmed" } : app)
    );
    toast.success("Appointment restored successfully!");
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

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              + New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>
                Enter the patient and appointment details below.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleNewAppointment} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input 
                    id="patientName" 
                    name="patientName"
                    value={newAppointment.patientName}
                    onChange={handleInputChange}
                    placeholder="Enter patient name"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
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
                    <Label htmlFor="time">Time</Label>
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
                  <Label htmlFor="type">Appointment Type</Label>
                  <Select 
                    value={newAppointment.type} 
                    onValueChange={(value) => handleSelectChange(value, "type")}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                      <SelectItem value="Check-up">Check-up</SelectItem>
                      <SelectItem value="Follow-up">Follow-up</SelectItem>
                      <SelectItem value="Emergency">Emergency</SelectItem>
                      <SelectItem value="Procedure">Procedure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input 
                    id="notes" 
                    name="notes"
                    value={newAppointment.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">Schedule Appointment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Appointment List</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="canceled" className="flex-1">Canceled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {displayedAppointments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No appointments for the selected date</div>
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
                          <Button variant="outline" size="sm">Reschedule</Button>
                          
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
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Today's Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Appointment Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Send Reminders
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
