import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // إغلاق القائمة المنسدلة إذا كانت مفتوحة
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl">Tbib360</span>
        </div>

        {/* Navbar Links - Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button
            onClick={() => scrollToSection("home")}
            className="font-medium transition-colors hover:text-primary"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            className="font-medium transition-colors hover:text-primary"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="font-medium transition-colors hover:text-primary"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="font-medium transition-colors hover:text-primary"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>

          <Button asChild variant="default" className="hidden md:inline-flex">
            <Link to="/dashboard">Dashboard</Link>
          </Button>

          {/* Hamburger Icon */}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4 space-y-4 border-t">
          <div className="space-y-2">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-2 py-1 text-lg font-medium rounded-md hover:bg-accent"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <Button asChild variant="default" size="sm">
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
