
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

interface QuickAction {
  title: string;
  icon: React.ReactNode;
  action: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
    <div className="space-y-2">
      {actions.map((action, index) => (
        <Button 
          key={index} 
          variant="outline" 
          className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={action.action}
        >
          {action.icon}
          <span className="ml-2">{action.title}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;
