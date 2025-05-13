
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, Database, FileText } from "lucide-react";

export default function RAMED() {
  // Mock RAMED data
  const claims = [
    {
      id: "R-23456",
      patientName: "Fatima Benali",
      patientId: 2,
      cardNumber: "RAMED-987654321",
      serviceDate: "2025-05-02",
      submitDate: "2025-05-03",
      serviceType: "Consultation",
      coverageStatus: "valid",
      expiryDate: "2025-12-31",
    },
    {
      id: "R-23457",
      patientName: "Omar Ziani",
      patientId: 5,
      cardNumber: "RAMED-321654987",
      serviceDate: "2025-04-22",
      submitDate: "2025-04-23",
      serviceType: "Medication",
      coverageStatus: "valid",
      expiryDate: "2025-09-15",
    },
    {
      id: "R-23458",
      patientName: "Fatima Benali",
      patientId: 2,
      cardNumber: "RAMED-987654321",
      serviceDate: "2025-04-05",
      submitDate: "2025-04-06",
      serviceType: "Laboratory Tests",
      coverageStatus: "valid",
      expiryDate: "2025-12-31",
    },
  ];

  // Mock patient eligibility data
  const eligibilityStats = {
    totalRAMEDPatients: 2,
    activeCards: 2,
    expiringCards: 1,
    expiredCards: 0,
  };

  const getCoverageStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge variant="default" className="bg-green-500">Valid</Badge>;
      case "expiring":
        return <Badge variant="secondary" className="bg-yellow-500">Expiring Soon</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">RAMED Coverage Management</h1>
          <p className="text-gray-500">Medical assistance scheme for economically disadvantaged</p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Connected</span>
          </div>
          <Button>Verify Patient Eligibility</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total RAMED Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eligibilityStats.totalRAMEDPatients}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{eligibilityStats.activeCards}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring within 30 days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{eligibilityStats.expiringCards}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{eligibilityStats.expiredCards}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
          <CardTitle>RAMED Services</CardTitle>
          <div className="flex gap-2 mt-2 md:mt-0">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Sync Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>RAMED Card #</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Coverage Status</TableHead>
                <TableHead>Card Expiry</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>{claim.patientName}</TableCell>
                  <TableCell>{claim.cardNumber}</TableCell>
                  <TableCell>{claim.serviceType}</TableCell>
                  <TableCell>{new Date(claim.serviceDate).toLocaleDateString()}</TableCell>
                  <TableCell>{getCoverageStatusBadge(claim.coverageStatus)}</TableCell>
                  <TableCell>{new Date(claim.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
