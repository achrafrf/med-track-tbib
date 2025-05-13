
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, FileText, Calendar, User, Phone } from "lucide-react";
import { useState } from "react";

// Mock patient data
const patients = [
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

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insurance.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Patients</h1>
        
        <Button className="mt-4 md:mt-0">+ Add New Patient</Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search patients..." 
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
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">All Patients</TabsTrigger>
          <TabsTrigger value="cnss" className="flex-1">CNSS</TabsTrigger>
          <TabsTrigger value="ramed" className="flex-1">RAMED</TabsTrigger>
          <TabsTrigger value="private" className="flex-1">Private Insurance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No patients found matching your search.
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
                          {patient.age} yrs • {patient.gender}
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                        <DropdownMenuItem>Medical History</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete Patient</DropdownMenuItem>
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
                      <span className="text-sm">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getInsuranceTagColor(patient.insurance)}`}>
                        {patient.insurance}
                      </span>
                      <span className="text-xs">{patient.insuranceId}</span>
                    </div>
                    
                    {patient.medicalHistory.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Medical History:</h4>
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
                      Patient Records
                    </Button>
                    <Button size="sm" className="w-full ml-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
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
                No CNSS patients found matching your search.
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
                No RAMED patients found matching your search.
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
                No Private insurance patients found matching your search.
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
