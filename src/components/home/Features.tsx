
import { Calendar, Database, FileText, LineChart, User, Users } from "lucide-react";

const features = [
  {
    title: "Appointment Management",
    description: "Schedule and manage patient appointments with an intuitive calendar interface. Send automated reminders to reduce no-shows.",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Electronic Prescriptions",
    description: "Create, manage and renew prescriptions digitally. Reduce errors and improve patient medication adherence.",
    icon: FileText,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Patient Records",
    description: "Maintain comprehensive electronic health records. Access patient history, diagnoses, and treatment plans instantly.",
    icon: Users,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "CNSS & RAMED Integration",
    description: "Seamlessly integrate with national health insurance systems for simplified billing and reimbursement processes.",
    icon: Database,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Analytics Dashboard",
    description: "Track key metrics and generate reports to optimize your clinic's operations and improve patient care.",
    icon: LineChart,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "User-Friendly Interface",
    description: "Intuitive design that's easy to use for all staff members, regardless of technical experience.",
    icon: User,
    color: "bg-rose-100 text-rose-600",
  },
];

export function Features() {
  return (
    <div id="features" className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Healthcare</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tbib360 offers a comprehensive suite of tools designed specifically for medical clinics to enhance efficiency and patient care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
