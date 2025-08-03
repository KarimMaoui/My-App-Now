import { MapPin } from "lucide-react";

interface MapEvent {
  id: string;
  title: string;
  location: string;
  emoji: string;
  attendees: number;
  x: number; // Position percentage
  y: number; // Position percentage
}

interface MapViewProps {
  events: MapEvent[];
  onEventClick: (event: MapEvent) => void;
}

const MapView = ({ events, onEventClick }: MapViewProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl overflow-hidden border border-border">
      {/* Harvard Campus Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 to-blue-100/30">
        {/* Streets */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-300 opacity-60" />
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300 opacity-60" />
        <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-gray-300 opacity-60" />
        <div className="absolute top-0 bottom-0 left-2/3 w-1 bg-gray-300 opacity-60" />
        
        {/* Harvard Buildings */}
        <div className="absolute top-[30%] left-[35%] w-8 h-6 bg-red-200 border border-red-300 rounded-sm opacity-80" />
        <div className="absolute top-[45%] left-[25%] w-12 h-8 bg-red-200 border border-red-300 rounded-sm opacity-80" />
        <div className="absolute top-[35%] left-[55%] w-10 h-10 bg-red-200 border border-red-300 rounded-sm opacity-80" />
        <div className="absolute top-[55%] left-[45%] w-14 h-6 bg-red-200 border border-red-300 rounded-sm opacity-80" />
        
        {/* Harvard Yard (Green Space) */}
        <div className="absolute top-[40%] left-[40%] w-16 h-12 bg-green-200 border border-green-300 rounded-lg opacity-70" />
        
        {/* Charles River */}
        <div className="absolute bottom-4 left-0 right-0 h-8 bg-blue-200 opacity-60 rounded-full" />
        
        {/* Labels */}
        <div className="absolute top-[35%] left-[42%] text-xs text-gray-600 font-semibold opacity-80">Harvard Yard</div>
        <div className="absolute bottom-8 left-4 text-xs text-blue-600 font-semibold opacity-80">Charles River</div>
      </div>

      {/* Event Markers */}
      {events.map((event) => (
        <button
          key={event.id}
          onClick={() => onEventClick(event)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{
            left: `${event.x}%`,
            top: `${event.y}%`
          }}
        >
          <div className="bg-card border-2 border-primary rounded-full p-3 shadow-neon hover:shadow-lg transition-all hover:scale-110 group-hover:animate-bounce-gentle">
            <span className="text-2xl">{event.emoji}</span>
          </div>
          
          {/* Event Info Tooltip */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card border border-border rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
            <p className="font-medium text-sm">{event.title}</p>
            <p className="text-xs text-muted-foreground">{event.attendees} going</p>
          </div>
        </button>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="bg-card border border-border rounded-lg p-2 shadow-card hover:shadow-lg transition-all">
          <MapPin className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Current Location Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-accent border-2 border-background rounded-full w-4 h-4 animate-pulse-neon" />
      </div>
    </div>
  );
};

export default MapView;