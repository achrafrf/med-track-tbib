
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, CalendarCheck, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock prescriptions data
const prescriptions = [
  {
    id: 1,
    patientName: "Ahmed Alami",
    patientId: 1,
    date: "2025-05-10",
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
    ],
    instructions: "Take with meals. Avoid alcohol consumption.",
    status: "active",
    doctor: "Dr. Said Benali",
    renewalDate: "2025-06-10",
  },
  {
    id: 2,
    patientName: "Fatima Benali",
    patientId: 2,
    date: "2025-05-05",
    medications: [
      { name: "Albuterol", dosage: "90mcg", frequency: "As needed", duration: "30 days" }
    ],
    instructions: "Use inhaler as needed for shortness of breath, up to 4 times daily.",
    status: "active",
    doctor: "Dr. Amina Tazi",
    renewalDate: "2025-06-05",
  },
  {
    id: 3,
    patientName: "Karim Tazi",
    patientId: 3,
    date: "2025-04-20",
    medications: [
      { name: "Loratadine", dosage: "10mg", frequency: "Once daily", duration: "15 days" }
    ],
    instructions: "Take as needed for allergic symptoms.",
    status: "completed",
    doctor: "Dr. Said Benali",
    renewalDate: "2025-05-05",
  },
  {
    id: 4,
    patientName: "Leila Chraibi",
    patientId: 4,
    date: "2025-05-08",
    medications: [
      { name: "Naproxen", dosage: "500mg", frequency: "Twice daily", duration: "10 days" },
      { name: "Calcium + Vitamin D", dosage: "600mg/400IU", frequency: "Once daily", duration: "60 days" }
    ],
    instructions: "Take Naproxen with food to reduce stomach upset.",
    status: "active",
    doctor: "Dr. Nadia El Fassi",
    renewalDate: "2025-06-08",
  },
  {
    id: 5,
    patientName: "Omar Ziani",
    patientId: 5,
    date: "2025-04-15",
    medications: [
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", duration: "30 days" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "30 days" },
      { name: "Metoprolol", dosage: "25mg", frequency: "Twice daily", duration: "30 days" }
    ],
    instructions: "Take as prescribed. Monitor blood pressure regularly.",
    status: "pending_renewal",
    doctor: "Dr. Said Benali",
    renewalDate: "2025-05-15",
  },
];

// Mock patients data (simplified)
const patients = [
  { id: 1, name: "Ahmed Alami" },
  { id: 2, name: "Fatima Benali" },
  { id: 3, name: "Karim Tazi" },
  { id: 4, name: "Leila Chraibi" },
  { id: 5, name: "Omar Ziani" },
  { id: 6, name: "Salma Idrissi" },
];

export default function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
    instructions: "",
    doctor: "Dr. Said Benali", // Default doctor
  });
  
  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medications.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Filter prescriptions based on selected tab
  const displayedPrescriptions = filteredPrescriptions.filter(prescription => {
    if (selectedTab === "all") return true;
    return prescription.status === selectedTab;
  });
  
  const handleNewPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New prescription:", newPrescription);
    toast.success("Prescription created successfully!");
    setIsDialogOpen(false);
    
    // Reset form
    setNewPrescription({
      patientId: "",
      medications: [{ name: "", dosage: "", frequency: "", duration: "" }],
      instructions: "",
      doctor: "Dr. Said Benali",
    });
  };
  
  const handlePatientSelect = (value: string) => {
    setNewPrescription(prev => ({ ...prev, patientId: value }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPrescription(prev => ({ ...prev, [name]: value }));
  };
  
  const handleMedicationChange = (index: number, field: string, value: string) => {
    setNewPrescription(prev => {
      const medications = [...prev.medications];
      medications[index] = { ...medications[index], [field]: value };
      return { ...prev, medications };
    });
  };
  
  const addMedication = () => {
    setNewPrescription(prev => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "", duration: "" }]
    }));
  };
  
  const removeMedication = (index: number) => {
    setNewPrescription(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>;
      case "pending_renewal":
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Renewal Needed</span>;
      case "completed":
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Prescriptions</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              + New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
              <DialogDescription>
                Create a new prescription for a patient.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleNewPrescription} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="patient">Select Patient</Label>
                  <Select 
                    value={newPrescription.patientId} 
                    onValueChange={handlePatientSelect}
                  >
                    <SelectTrigger id="patient">
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Medications</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addMedication}
                    >
                      + Add Medication
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {newPrescription.medications.map((medication, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`medication-${index}`}>Medication</Label>
                              <Input 
                                id={`medication-${index}`}
                                value={medication.name}
                                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                                placeholder="Medication name"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                              <Input 
                                id={`dosage-${index}`}
                                value={medication.dosage}
                                onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                                placeholder="e.g., 10mg"
                                required
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                              <Input 
                                id={`frequency-${index}`}
                                value={medication.frequency}
                                onChange={(e) => handleMedicationChange(index, "frequency", e.target.value)}
                                placeholder="e.g., Twice daily"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor={`duration-${index}`}>Duration</Label>
                              <Input 
                                id={`duration-${index}`}
                                value={medication.duration}
                                onChange={(e) => handleMedicationChange(index, "duration", e.target.value)}
                                placeholder="e.g., 30 days"
                                required
                              />
                            </div>
                          </div>
                          
                          {newPrescription.medications.length > 1 && (
                            <div className="flex justify-end">
                              <Button 
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeMedication(index)}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea 
                    id="instructions"
                    name="instructions"
                    value={newPrescription.instructions}
                    onChange={handleInputChange}
                    placeholder="Special instructions for the patient"
                    rows={3}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit">Create Prescription</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search prescriptions..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
          <TabsTrigger value="pending_renewal" className="flex-1">Pending Renewal</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedTab} className="space-y-6">
          {displayedPrescriptions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No prescriptions found matching your search.
            </div>
          ) : (
            <div className="space-y-4">
              {displayedPrescriptions.map(prescription => (
                <Card key={prescription.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                        <CardDescription>
                          Created on {new Date(prescription.date).toLocaleDateString()} by {prescription.doctor}
                        </CardDescription>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center gap-2">
                        {getStatusBadge(prescription.status)}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Medications:</h4>
                        <div className="space-y-2">
                          {prescription.medications.map((medication, index) => (
                            <div key={index} className="border-l-2 border-tbib-300 pl-4">
                              <div className="font-medium">{medication.name} - {medication.dosage}</div>
                              <div className="text-sm text-gray-600">
                                {medication.frequency}, for {medication.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {prescription.instructions && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Instructions:</h4>
                          <p className="text-sm text-gray-600">{prescription.instructions}</p>
                        </div>
                      )}
                      
                      {prescription.status === "active" && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarCheck className="h-4 w-4" />
                          <span>Renewal date: {new Date(prescription.renewalDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 py-2 px-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View History</Button>
                    {prescription.status === "active" && (
                      <Button size="sm">Renew Prescription</Button>
                    )}
                    {prescription.status === "pending_renewal" && (
                      <Button size="sm">Process Renewal</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
