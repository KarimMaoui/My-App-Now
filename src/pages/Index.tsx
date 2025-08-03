import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import EventCard from "@/components/EventCard";
import MapView from "@/components/MapView";
import CreateEventModal from "@/components/CreateEventModal";
import AIChat from "@/components/AIChat";
import { Button } from "@/components/ui/button";
import { MapPin, List } from "lucide-react";

interface Event {
  id: string;
  title: string;
  location: string;
  time: string;
  attendees: number;
  maxAttendees: number;
  hostName: string;
  emoji: string;
  x: number;
  y: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'discover' | 'ai'>('discover');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Tennis at the park",
      location: "Central Park Courts",
      time: "4:30 PM",
      attendees: 2,
      maxAttendees: 4,
      hostName: "Alex",
      emoji: "🎾",
      x: 30,
      y: 40
    },
    {
      id: "2",
      title: "Pizza & study session",
      location: "Joe's Coffee",
      time: "6:00 PM",
      attendees: 3,
      maxAttendees: 6,
      hostName: "Maya",
      emoji: "🍕",
      x: 60,
      y: 30
    },
    {
      id: "3",
      title: "Sunset yoga",
      location: "Pier 45",
      time: "7:15 PM",
      attendees: 5,
      maxAttendees: 8,
      hostName: "Zoe",
      emoji: "🧘",
      x: 80,
      y: 70
    },
    {
      id: "4",
      title: "Late night gaming",
      location: "GameStop Lounge",
      time: "9:00 PM",
      attendees: 1,
      maxAttendees: 4,
      hostName: "Jordan",
      emoji: "🎮",
      x: 20,
      y: 60
    }
  ]);

  const handleCreateEvent = (newEvent: Event) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId && event.attendees < event.maxAttendees
          ? { ...event, attendees: event.attendees + 1 }
          : event
      )
    );
  };

  const friendsEvents = events.filter(event => event.hostName === "Alex" || event.hostName === "Maya");
  const discoverEvents = events;

  const renderContent = () => {
    if (activeTab === 'ai') {
      return <AIChat onSuggestion={() => {}} />;
    }

    const currentEvents = activeTab === 'friends' ? friendsEvents : discoverEvents;

    return (
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h1 className="text-3xl font-black bg-gradient-primary bg-clip-text text-transparent">
              {activeTab === 'friends' ? 'Friends' : 'Discover'}
            </h1>
            <p className="text-muted-foreground">
              {activeTab === 'friends' 
                ? 'What your circle is up to' 
                : 'Open events around you'
              }
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'map' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('map')}
            >
              <MapPin className="w-5 h-5" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {viewMode === 'map' ? (
            <div className="h-full min-h-[500px]">
              <MapView 
                events={currentEvents}
                onEventClick={(event) => console.log('Event clicked:', event)}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {currentEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No events yet</p>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === 'friends' 
                      ? 'Your friends haven\'t created any events' 
                      : 'Be the first to create something fun!'
                    }
                  </p>
                </div>
              ) : (
                currentEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    title={event.title}
                    location={event.location}
                    time={event.time}
                    attendees={event.attendees}
                    maxAttendees={event.maxAttendees}
                    hostName={event.hostName}
                    emoji={event.emoji}
                    onJoin={() => handleJoinEvent(event.id)}
                    onLike={() => console.log('Liked event:', event.id)}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {renderContent()}
      
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateEvent={() => setShowCreateModal(true)}
      />

      <CreateEventModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
};

export default Index;