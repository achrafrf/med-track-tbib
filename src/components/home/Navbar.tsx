
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl">Tbib360</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="#features" className="font-medium transition-colors hover:text-primary">
            Features
          </Link>
          <Link to="#testimonials" className="font-medium transition-colors hover:text-primary">
            Testimonials
          </Link>
          <Link to="#contact" className="font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          
          <Button asChild variant="default" className="hidden md:inline-flex">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          
          <button
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {!isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden p-4 space-y-4 border-t">
          <div className="space-y-2">
            <Link
              to="/"
              className="block px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#features"
              className="block px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="#testimonials"
              className="block px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              to="#contact"
              className="block px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            
            <Button asChild variant="default" size="sm">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
