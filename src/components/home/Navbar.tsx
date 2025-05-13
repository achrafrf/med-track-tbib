
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-tbib-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl text-tbib-600">Tbib360</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium text-gray-700 hover:text-tbib-600 transition-colors">Home</Link>
          <Link to="#features" className="font-medium text-gray-700 hover:text-tbib-600 transition-colors">Features</Link>
          <Link to="#testimonials" className="font-medium text-gray-700 hover:text-tbib-600 transition-colors">Testimonials</Link>
          <Link to="#contact" className="font-medium text-gray-700 hover:text-tbib-600 transition-colors">Contact</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-b shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            <Link 
              to="/" 
              className="font-medium text-gray-700 hover:text-tbib-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#features" 
              className="font-medium text-gray-700 hover:text-tbib-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#testimonials" 
              className="font-medium text-gray-700 hover:text-tbib-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="#contact" 
              className="font-medium text-gray-700 hover:text-tbib-600 transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button asChild variant="outline">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button asChild>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
