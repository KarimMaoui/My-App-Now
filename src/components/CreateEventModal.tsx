import { useState } from "react";
import { X, MapPin, Clock, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (event: any) => void;
}

const emojis = ["🎾", "🍕", "☕", "🎬", "🧘", "🎮", "📚", "🍻", "🎵", "🏃", "🎨", "🛹"];

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }: CreateEventModalProps) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("4");
  const [selectedEmoji, setSelectedEmoji] = useState("🎉");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !time) return;

    onCreateEvent({
      id: Date.now().toString(),
      title,
      location,
      time,
      maxAttendees: parseInt(maxAttendees),
      attendees: 1,
      hostName: "You",
      emoji: selectedEmoji,
      x: Math.random() * 80 + 10, // Random position for map
      y: Math.random() * 80 + 10
    });

    // Reset form
    setTitle("");
    setLocation("");
    setTime("");
    setMaxAttendees("4");
    setSelectedEmoji("🎉");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md mx-4 mb-0 sm:mb-4 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Create Event</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emoji Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Pick a vibe ✨</Label>
            <div className="grid grid-cols-6 gap-2">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`p-3 rounded-xl text-2xl transition-all hover:scale-110 ${
                    selectedEmoji === emoji 
                      ? 'bg-primary/20 scale-110' 
                      : 'bg-muted hover:bg-muted/60'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Event Title */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium mb-2 block">
              What's happening?
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tennis at the park"
              className="bg-muted border-0 rounded-xl h-12"
              required
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-sm font-medium mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Where?
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Central Park Courts"
              className="bg-muted border-0 rounded-xl h-12"
              required
            />
          </div>

          {/* Time & Attendees */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="time" className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Clock className="w-4 h-4" />
                When?
              </Label>
              <Input
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="4:30 PM"
                className="bg-muted border-0 rounded-xl h-12"
                required
              />
            </div>
            <div>
              <Label htmlFor="attendees" className="text-sm font-medium mb-2 block flex items-center gap-2">
                <Users className="w-4 h-4" />
                Spots
              </Label>
              <Input
                id="attendees"
                type="number"
                value={maxAttendees}
                onChange={(e) => setMaxAttendees(e.target.value)}
                min="2"
                max="20"
                className="bg-muted border-0 rounded-xl h-12"
                required
              />
            </div>
          </div>

          {/* Create Button */}
          <Button type="submit" variant="default" size="lg" className="w-full">
            Create Event 🚀
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;