
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutList } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

export function AppHeader() {
  const { t } = useLanguage();
  const { toggleSidebar } = useSidebar();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="mr-2">
                <LayoutList className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <AppSidebar />
            </SheetContent>
          </Sheet>
        </div>
        
        <button 
          onClick={toggleSidebar} 
          className="hidden mr-2 lg:flex items-center justify-center h-9 w-9 rounded-md border hover:bg-accent"
        >
          <LayoutList className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar</span>
        </button>
        
        <div className="ml-auto flex items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle />
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User avatar" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
