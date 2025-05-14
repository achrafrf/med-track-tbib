
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, FileText, Calendar, User, Phone, UserPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePatients } from "@/hooks/usePatients";
import PatientForm from "@/components/patients/PatientForm";

export default function Patients() {
  const { t } = useLanguage();
  const {
    filteredPatients,
    searchTerm, 
    setSearchTerm,
    isDialogOpen,
    setIsDialogOpen,
    addPatient,
    deletePatient,
    getInsuranceTagColor
  } = usePatients();
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">{t("patients.title") || "Patients"}</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0">
              <UserPlus className="h-4 w-4 mr-2" />
              {t("patients.addNew") || "+ Add New Patient"}
            </Button>
          </DialogTrigger>
          <PatientForm 
            setIsDialogOpen={setIsDialogOpen}
            onAddPatient={addPatient}
          />
        </Dialog>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder={t("patients.search") || "Search patients..."} 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Button variant="outline">{t("common.filter") || "Filter"}</Button>
              <Button variant="outline">{t("common.export") || "Export"}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">{t("tabs.allPatients") || "All Patients"}</TabsTrigger>
          <TabsTrigger value="cnss" className="flex-1">CNSS</TabsTrigger>
          <TabsTrigger value="ramed" className="flex-1">RAMED</TabsTrigger>
          <TabsTrigger value="private" className="flex-1">{t("patients.private") || "Private Insurance"}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t("patients.noResults") || "No patients found matching your search."}
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardHeader className="pb-2 flex flex-row justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>
                          {patient.age} {t("patients.age") || "yrs"} • {patient.gender}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{t("common.actions") || "Actions"}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>{t("patients.actions.viewDetails") || "View Details"}</DropdownMenuItem>
                        <DropdownMenuItem>{t("patients.actions.edit") || "Edit Patient"}</DropdownMenuItem>
                        <DropdownMenuItem>{t("patients.actions.schedule") || "Schedule Appointment"}</DropdownMenuItem>
                        <DropdownMenuItem>{t("patients.actions.history") || "Medical History"}</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => deletePatient(patient.id)}
                        >
                          {t("patients.actions.delete") || "Delete Patient"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {t("patients.lastVisit") || "Last visit"}: {new Date(patient.lastVisit).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getInsuranceTagColor(patient.insurance)}`}>
                        {patient.insurance}
                      </span>
                      <span className="text-xs">{patient.insuranceId}</span>
                    </div>
                    
                    {patient.medicalHistory.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">{t("patients.medicalHistory") || "Medical History"}:</h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.medicalHistory.map((condition, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {condition}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="outline" size="sm" className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      {t("patients.records") || "Patient Records"}
                    </Button>
                    <Button size="sm" className="w-full ml-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t("patients.bookAppointment") || "Book Appointment"}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="cnss">
          {/* Filter patients by CNSS insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.filter(p => p.insurance === "CNSS").length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t("patients.noCNSS") || "No CNSS patients found matching your search."}
              </div>
            ) : (
              filteredPatients.filter(p => p.insurance === "CNSS").map((patient) => (
                <Card key={patient.id}>
                  {/* Same card content as in "all" tab */}
                  {/* ... */}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="ramed">
          {/* Filter patients by RAMED insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.filter(p => p.insurance === "RAMED").length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t("patients.noRAMED") || "No RAMED patients found matching your search."}
              </div>
            ) : (
              filteredPatients.filter(p => p.insurance === "RAMED").map((patient) => (
                <Card key={patient.id}>
                  {/* Same card content as in "all" tab */}
                  {/* ... */}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="private">
          {/* Filter patients by Private insurance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.filter(p => p.insurance === "Private").length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                {t("patients.noPrivate") || "No Private insurance patients found matching your search."}
              </div>
            ) : (
              filteredPatients.filter(p => p.insurance === "Private").map((patient) => (
                <Card key={patient.id}>
                  {/* Same card content as in "all" tab */}
                  {/* ... */}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
