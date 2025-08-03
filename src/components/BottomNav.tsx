import { Users, Compass, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavProps {
  activeTab: 'friends' | 'discover' | 'ai';
  onTabChange: (tab: 'friends' | 'discover' | 'ai') => void;
  onCreateEvent: () => void;
}

const BottomNav = ({ activeTab, onTabChange, onCreateEvent }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around p-4 max-w-md mx-auto">
        {/* Friends Tab */}
        <button
          onClick={() => onTabChange('friends')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'friends' 
              ? 'text-primary bg-primary/10' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs font-medium">Friends</span>
        </button>

        {/* Create Event Button */}
        <Button
          onClick={onCreateEvent}
          variant="neon"
          size="icon"
          className="rounded-full w-14 h-14"
        >
          <Plus className="w-8 h-8" />
        </Button>

        {/* Discover Tab */}
        <button
          onClick={() => onTabChange('discover')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'discover' 
              ? 'text-primary bg-primary/10' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Compass className="w-6 h-6" />
          <span className="text-xs font-medium">Discover</span>
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => onTabChange('ai')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            activeTab === 'ai' 
              ? 'text-accent bg-accent/10' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs font-medium">AI</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;