
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="hero-pattern py-16 px-6 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              A comprehensive medical program to manage your clinic with ease
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Streamline your medical practice with Tbib360's comprehensive platform for appointment scheduling, electronic prescriptions, and patient records management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-base">
                <Link to="/dashboard">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base">
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border relative">
              <div className="absolute -top-3 -left-3 w-24 h-24 bg-tbib-600/10 rounded-full"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-tbib-600/10 rounded-full"></div>
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-tbib-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Tbib360 Dashboard</h3>
                    <p className="text-gray-500 text-sm">For medical professionals</p>
                  </div>
                </div>
                
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
