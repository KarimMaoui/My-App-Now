import { MapPin, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  title: string;
  location: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  hostName: string;
  hostAvatar?: string;
  emoji?: string;
  isLiked?: boolean;
  onJoin?: () => void;
  onLike?: () => void;
}

const EventCard = ({
  title,
  location,
  time,
  attendees,
  maxAttendees,
  hostName,
  hostAvatar,
  emoji = "🎉",
  isLiked = false,
  onJoin,
  onLike
}: EventCardProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-card hover:shadow-lg transition-all duration-300 hover:scale-105">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-xl">{emoji}</span>
          </div>
          <div>
            <h3 className="font-bold text-foreground text-lg">{title}</h3>
            <p className="text-muted-foreground text-sm">by {hostName}</p>
          </div>
        </div>
        <button
          onClick={onLike}
          className={`p-2 rounded-full transition-all ${
            isLiked 
              ? 'text-secondary bg-secondary/20' 
              : 'text-muted-foreground hover:text-secondary hover:bg-secondary/10'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{attendees}/{maxAttendees} going</span>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        onClick={onJoin}
        variant="default" 
        className="w-full"
        disabled={attendees >= maxAttendees}
      >
        {attendees >= maxAttendees ? "Full 😔" : "Join 🙌"}
      </Button>
    </div>
  );
};

export default EventCard;