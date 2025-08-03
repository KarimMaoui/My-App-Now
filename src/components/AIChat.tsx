import { useState } from "react";
import { Send, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  onSuggestion: (suggestion: string) => void;
}

const AIChat = ({ onSuggestion }: AIChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hey! 👋 I'm here to help you find or create the perfect spontaneous activity. What are you in the mood for?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");

  const suggestions = [
    "I feel like playing ping pong 🏓",
    "Is anyone getting ramen later? 🍜",
    "Want to catch a sunset somewhere 🌅",
    "Looking for a coffee study buddy ☕",
    "Anyone up for a quick workout? 💪"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: generateAIResponse(inputText),
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputText("");
  };

  const generateAIResponse = (input: string): string => {
    const responses = [
      "I found some ping pong tables nearby! 🏓 Check out the Discover tab for active games.",
      "There's a ramen meetup happening at 7 PM downtown! Want me to show you? 🍜",
      "Perfect timing for sunset at the pier! I can help you create an event. 🌅",
      "I see a few coffee shops with study groups right now. Let me pull those up! ☕",
      "There's a running group meeting in 30 minutes at the park! 🏃‍♂️"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <h2 className="font-bold text-lg">AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Your spontaneous activity buddy</p>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 border-b border-border">
        <p className="text-sm font-medium mb-3 text-muted-foreground">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputText(suggestion)}
              className="bg-muted hover:bg-muted/60 text-sm px-3 py-2 rounded-xl transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="I'm in the mood for..."
            className="flex-1 bg-muted border-0 rounded-xl h-12"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-12 w-12 rounded-xl"
            disabled={!inputText.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;