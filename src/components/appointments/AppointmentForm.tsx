
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AppointmentFormProps {
  setIsDialogOpen: (open: boolean) => void;
  onAddAppointment: (appointment: any) => void;
}

const AppointmentForm = ({ setIsDialogOpen, onAddAppointment }: AppointmentFormProps) => {
  const { t, language } = useLanguage();
  
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
  
  const handleNewAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const appointmentToAdd = {
      patientName: newAppointment.patientName,
      date: newAppointment.date,
      time: newAppointment.time,
      type: newAppointment.type,
      notes: newAppointment.notes,
    };
    
    onAddAppointment(appointmentToAdd);
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

  return (
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
  );
};

export default AppointmentForm;
