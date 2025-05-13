
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // General
    "app.title": "Tbib360",
    "app.darkMode": "Dark Mode",
    "app.lightMode": "Light Mode",
    
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.appointments": "Appointments",
    "nav.patients": "Patients",
    "nav.prescriptions": "Prescriptions",
    "nav.insurance": "Insurance",
    "nav.cnss": "CNSS",
    "nav.ramed": "RAMED",
    "nav.backToHome": "Back to Home",
    
    // Appointments
    "appointments.title": "Appointments",
    "appointments.new": "New Appointment",
    "appointments.schedule": "Schedule New Appointment",
    "appointments.enterDetails": "Enter the patient and appointment details below.",
    "appointments.patientName": "Patient Name",
    "appointments.date": "Date",
    "appointments.time": "Time",
    "appointments.type": "Appointment Type",
    "appointments.notes": "Notes",
    "appointments.schedule.button": "Schedule Appointment",
    "appointments.cancel": "Cancel",
    "appointments.delete": "Delete",
    "appointments.restore": "Restore",
    "appointments.reschedule": "Reschedule",
    "appointments.confirmCancel": "Cancel Appointment",
    "appointments.confirmCancelMessage": "Are you sure you want to cancel this appointment? This action can be reversed later.",
    "appointments.confirmDelete": "Delete Appointment",
    "appointments.confirmDeleteMessage": "Are you sure you want to delete this appointment? This action cannot be undone.",
    "appointments.keep": "No, keep it",
    "appointments.confirmCancelButton": "Yes, cancel appointment",
    "appointments.confirmDeleteButton": "Delete",
    "appointments.cancelConfirm": "Cancel",
    "appointments.noAppointments": "No appointments for the selected date",
    "appointments.noCanceledAppointments": "No canceled appointments for the selected date",
    "appointments.status.confirmed": "Confirmed",
    "appointments.status.pending": "Pending",
    "appointments.status.canceled": "Canceled",
    "appointments.type.consultation": "Consultation",
    "appointments.type.checkup": "Check-up",
    "appointments.type.followup": "Follow-up",
    "appointments.type.emergency": "Emergency",
    "appointments.type.procedure": "Procedure",
    "appointments.success.scheduled": "Appointment scheduled successfully!",
    "appointments.success.canceled": "Appointment canceled successfully!",
    "appointments.success.restored": "Appointment restored successfully!",
    "appointments.success.deleted": "Appointment deleted successfully!",
    
    // Quick Actions
    "quickActions.title": "Quick Actions",
    "quickActions.todaySchedule": "Today's Schedule",
    "quickActions.reports": "Appointment Reports",
    "quickActions.reminders": "Send Reminders",
    "quickActions.addPatient": "Add Patient",
    "quickActions.newPrescription": "New Prescription",
    
    // Tabs
    "tabs.upcoming": "Upcoming",
    "tabs.all": "All",
    "tabs.canceled": "Canceled",
    
    // Calendar
    "calendar.title": "Calendar"
  },
  fr: {
    // General
    "app.title": "Tbib360",
    "app.darkMode": "Mode Sombre",
    "app.lightMode": "Mode Clair",
    
    // Navigation
    "nav.dashboard": "Tableau de Bord",
    "nav.appointments": "Rendez-vous",
    "nav.patients": "Patients",
    "nav.prescriptions": "Ordonnances",
    "nav.insurance": "Assurance",
    "nav.cnss": "CNSS",
    "nav.ramed": "RAMED",
    "nav.backToHome": "Retour à l'Accueil",
    
    // Appointments
    "appointments.title": "Rendez-vous",
    "appointments.new": "Nouveau Rendez-vous",
    "appointments.schedule": "Planifier un Nouveau Rendez-vous",
    "appointments.enterDetails": "Entrez les détails du patient et du rendez-vous ci-dessous.",
    "appointments.patientName": "Nom du Patient",
    "appointments.date": "Date",
    "appointments.time": "Heure",
    "appointments.type": "Type de Rendez-vous",
    "appointments.notes": "Notes",
    "appointments.schedule.button": "Planifier le Rendez-vous",
    "appointments.cancel": "Annuler",
    "appointments.delete": "Supprimer",
    "appointments.restore": "Restaurer",
    "appointments.reschedule": "Reprogrammer",
    "appointments.confirmCancel": "Annuler le Rendez-vous",
    "appointments.confirmCancelMessage": "Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action peut être annulée ultérieurement.",
    "appointments.confirmDelete": "Supprimer le Rendez-vous",
    "appointments.confirmDeleteMessage": "Êtes-vous sûr de vouloir supprimer ce rendez-vous ? Cette action est irréversible.",
    "appointments.keep": "Non, le garder",
    "appointments.confirmCancelButton": "Oui, annuler le rendez-vous",
    "appointments.confirmDeleteButton": "Supprimer",
    "appointments.cancelConfirm": "Annuler",
    "appointments.noAppointments": "Pas de rendez-vous pour la date sélectionnée",
    "appointments.noCanceledAppointments": "Pas de rendez-vous annulés pour la date sélectionnée",
    "appointments.status.confirmed": "Confirmé",
    "appointments.status.pending": "En attente",
    "appointments.status.canceled": "Annulé",
    "appointments.type.consultation": "Consultation",
    "appointments.type.checkup": "Bilan",
    "appointments.type.followup": "Suivi",
    "appointments.type.emergency": "Urgence",
    "appointments.type.procedure": "Procédure",
    "appointments.success.scheduled": "Rendez-vous planifié avec succès!",
    "appointments.success.canceled": "Rendez-vous annulé avec succès!",
    "appointments.success.restored": "Rendez-vous restauré avec succès!",
    "appointments.success.deleted": "Rendez-vous supprimé avec succès!",
    
    // Quick Actions
    "quickActions.title": "Actions Rapides",
    "quickActions.todaySchedule": "Programme du Jour",
    "quickActions.reports": "Rapports de Rendez-vous",
    "quickActions.reminders": "Envoyer des Rappels",
    "quickActions.addPatient": "Ajouter un Patient",
    "quickActions.newPrescription": "Nouvelle Ordonnance",
    
    // Tabs
    "tabs.upcoming": "À venir",
    "tabs.all": "Tous",
    "tabs.canceled": "Annulés",
    
    // Calendar
    "calendar.title": "Calendrier"
  },
  ar: {
    // General
    "app.title": "طبيب360",
    "app.darkMode": "الوضع الداكن",
    "app.lightMode": "الوضع الفاتح",
    
    // Navigation
    "nav.dashboard": "لوحة التحكم",
    "nav.appointments": "المواعيد",
    "nav.patients": "المرضى",
    "nav.prescriptions": "الوصفات الطبية",
    "nav.insurance": "التأمين",
    "nav.cnss": "الصندوق الوطني للضمان الاجتماعي",
    "nav.ramed": "نظام المساعدة الطبية",
    "nav.backToHome": "العودة إلى الصفحة الرئيسية",
    
    // Appointments
    "appointments.title": "المواعيد",
    "appointments.new": "موعد جديد",
    "appointments.schedule": "جدولة موعد جديد",
    "appointments.enterDetails": "أدخل تفاصيل المريض والموعد أدناه.",
    "appointments.patientName": "اسم المريض",
    "appointments.date": "التاريخ",
    "appointments.time": "الوقت",
    "appointments.type": "نوع الموعد",
    "appointments.notes": "ملاحظات",
    "appointments.schedule.button": "جدولة الموعد",
    "appointments.cancel": "إلغاء",
    "appointments.delete": "حذف",
    "appointments.restore": "استعادة",
    "appointments.reschedule": "إعادة جدولة",
    "appointments.confirmCancel": "إلغاء الموعد",
    "appointments.confirmCancelMessage": "هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟ يمكن التراجع عن هذا الإجراء لاحقًا.",
    "appointments.confirmDelete": "حذف الموعد",
    "appointments.confirmDeleteMessage": "هل أنت متأكد من رغبتك في حذف هذا الموعد؟ لا يمكن التراجع عن هذا الإجراء.",
    "appointments.keep": "لا، احتفظ به",
    "appointments.confirmCancelButton": "نعم، إلغاء الموعد",
    "appointments.confirmDeleteButton": "حذف",
    "appointments.cancelConfirm": "إلغاء",
    "appointments.noAppointments": "لا توجد مواعيد للتاريخ المحدد",
    "appointments.noCanceledAppointments": "لا توجد مواعيد ملغاة للتاريخ المحدد",
    "appointments.status.confirmed": "مؤكد",
    "appointments.status.pending": "قيد الانتظار",
    "appointments.status.canceled": "ملغى",
    "appointments.type.consultation": "استشارة",
    "appointments.type.checkup": "فحص",
    "appointments.type.followup": "متابعة",
    "appointments.type.emergency": "طوارئ",
    "appointments.type.procedure": "إجراء",
    "appointments.success.scheduled": "تمت جدولة الموعد بنجاح!",
    "appointments.success.canceled": "تم إلغاء الموعد بنجاح!",
    "appointments.success.restored": "تمت استعادة الموعد بنجاح!",
    "appointments.success.deleted": "تم حذف الموعد بنجاح!",
    
    // Quick Actions
    "quickActions.title": "إجراءات سريعة",
    "quickActions.todaySchedule": "جدول اليوم",
    "quickActions.reports": "تقارير المواعيد",
    "quickActions.reminders": "إرسال تذكيرات",
    "quickActions.addPatient": "إضافة مريض",
    "quickActions.newPrescription": "وصفة طبية جديدة",
    
    // Tabs
    "tabs.upcoming": "المواعيد القادمة",
    "tabs.all": "الكل",
    "tabs.canceled": "الملغاة",
    
    // Calendar
    "calendar.title": "التقويم"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    
    // Set text direction based on language
    if (language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
