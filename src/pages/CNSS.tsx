
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
import { Check, Database, FileText, X } from "lucide-react";

export default function CNSS() {
  // Mock CNSS claims data
  const claims = [
    {
      id: "C-12345",
      patientName: "Ahmed Alami",
      patientId: 1,
      serviceDate: "2025-05-01",
      submitDate: "2025-05-03",
      amount: 450,
      status: "approved",
      reimbursementAmount: 350,
      serviceType: "Consultation",
    },
    {
      id: "C-12346",
      patientName: "Karim Tazi",
      patientId: 3,
      serviceDate: "2025-04-28",
      submitDate: "2025-04-29",
      amount: 1200,
      status: "pending",
      reimbursementAmount: null,
      serviceType: "Laboratory Tests",
    },
    {
      id: "C-12347",
      patientName: "Salma Idrissi",
      patientId: 6,
      serviceDate: "2025-04-25",
      submitDate: "2025-04-26",
      amount: 2500,
      status: "approved",
      reimbursementAmount: 2000,
      serviceType: "Procedure",
    },
    {
      id: "C-12348",
      patientName: "Ahmed Alami",
      patientId: 1,
      serviceDate: "2025-04-15",
      submitDate: "2025-04-16",
      amount: 800,
      status: "rejected",
      reimbursementAmount: 0,
      serviceType: "Radiology",
    },
    {
      id: "C-12349",
      patientName: "Ahmed Alami",
      patientId: 1,
      serviceDate: "2025-04-10",
      submitDate: "2025-04-12",
      amount: 350,
      status: "approved",
      reimbursementAmount: 280,
      serviceType: "Consultation",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate statistics
  const totalClaimsAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const totalReimbursed = claims.reduce((sum, claim) => sum + (claim.reimbursementAmount || 0), 0);
  const pendingClaims = claims.filter(claim => claim.status === "pending").length;
  const approvalRate = Math.round((claims.filter(claim => claim.status === "approved").length / claims.length) * 100);

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">CNSS Insurance Management</h1>
          <p className="text-gray-500">Manage claims and reimbursements</p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Connected</span>
          </div>
          <Button>Submit New Claim</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Claims Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClaimsAmount.toLocaleString()} MAD</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reimbursed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReimbursed.toLocaleString()} MAD</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingClaims}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalRate}%</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between">
          <CardTitle>CNSS Claims</CardTitle>
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
                <TableHead>Claim ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Service Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reimbursement</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>{claim.patientName}</TableCell>
                  <TableCell>{claim.serviceType}</TableCell>
                  <TableCell>{new Date(claim.serviceDate).toLocaleDateString()}</TableCell>
                  <TableCell>{claim.amount} MAD</TableCell>
                  <TableCell>{getStatusBadge(claim.status)}</TableCell>
                  <TableCell>
                    {claim.reimbursementAmount !== null ? `${claim.reimbursementAmount} MAD` : '-'}
                  </TableCell>
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
