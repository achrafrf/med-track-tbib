
import { useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { NewPatient } from "@/components/patients/PatientForm";

// Mock patient data
const initialPatients = [
  {
    id: 1,
    name: "Ahmed Alami",
    age: 45,
    gender: "Male",
    phone: "+212 6XX-XXXXX1",
    email: "ahmed.alami@example.com",
    lastVisit: "2025-05-10",
    insurance: "CNSS",
    insuranceId: "CNSS-123456789",
    medicalHistory: ["Hypertension", "Diabetes Type 2"],
    avatar: "https://i.pravatar.cc/150?img=30",
  },
  {
    id: 2,
    name: "Fatima Benali",
    age: 32,
    gender: "Female",
    phone: "+212 6XX-XXXXX2",
    email: "fatima.benali@example.com",
    lastVisit: "2025-05-05",
    insurance: "RAMED",
    insuranceId: "RAMED-987654321",
    medicalHistory: ["Asthma"],
    avatar: "https://i.pravatar.cc/150?img=31",
  },
  {
    id: 3,
    name: "Karim Tazi",
    age: 28,
    gender: "Male",
    phone: "+212 6XX-XXXXX3",
    email: "karim.tazi@example.com",
    lastVisit: "2025-04-20",
    insurance: "CNSS",
    insuranceId: "CNSS-456789123",
    medicalHistory: ["Allergies"],
    avatar: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 4,
    name: "Leila Chraibi",
    age: 52,
    gender: "Female",
    phone: "+212 6XX-XXXXX4",
    email: "leila.chraibi@example.com",
    lastVisit: "2025-05-08",
    insurance: "Private",
    insuranceId: "PRV-789123456",
    medicalHistory: ["Arthritis"],
    avatar: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    name: "Omar Ziani",
    age: 64,
    gender: "Male",
    phone: "+212 6XX-XXXXX5",
    email: "omar.ziani@example.com",
    lastVisit: "2025-04-15",
    insurance: "RAMED",
    insuranceId: "RAMED-321654987",
    medicalHistory: ["Coronary Artery Disease", "Hypertension"],
    avatar: "https://i.pravatar.cc/150?img=35",
  },
  {
    id: 6,
    name: "Salma Idrissi",
    age: 29,
    gender: "Female",
    phone: "+212 6XX-XXXXX6",
    email: "salma.idrissi@example.com",
    lastVisit: "2025-05-01",
    insurance: "CNSS",
    insuranceId: "CNSS-654321987",
    medicalHistory: [],
    avatar: "https://i.pravatar.cc/150?img=23",
  },
];

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  insurance: string;
  insuranceId: string;
  medicalHistory: string[];
  avatar: string;
}

export const usePatients = () => {
  const { t } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insurance.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Add a new patient
  const addPatient = (newPatientData: NewPatient) => {
    const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
    
    const patientToAdd: Patient = {
      id: newId,
      name: newPatientData.name,
      age: newPatientData.age,
      gender: newPatientData.gender,
      phone: newPatientData.phone,
      email: newPatientData.email,
      lastVisit: new Date().toISOString().split('T')[0], // Current date as last visit
      insurance: newPatientData.insurance,
      insuranceId: newPatientData.insuranceId,
      medicalHistory: newPatientData.medicalHistory,
      avatar: newPatientData.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };
    
    setPatients(prevPatients => [...prevPatients, patientToAdd]);
    toast.success(t("patients.success.created"));
  };
  
  // Delete a patient
  const deletePatient = (id: number) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
    toast.success(t("patients.success.deleted"));
  };
  
  // Get insurance tag color
  const getInsuranceTagColor = (insurance: string) => {
    switch (insurance) {
      case "CNSS":
        return "bg-blue-100 text-blue-800";
      case "RAMED":
        return "bg-green-100 text-green-800";
      case "Private":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return {
    patients,
    filteredPatients,
    searchTerm,
    setSearchTerm,
    isDialogOpen,
    setIsDialogOpen,
    addPatient,
    deletePatient,
    getInsuranceTagColor,
  };
};

export type PatientsHookReturn = ReturnType<typeof usePatients>;
