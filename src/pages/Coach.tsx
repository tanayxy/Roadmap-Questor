import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Brain, Sparkles, Code, BookOpen } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const COACHING_TOPICS = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code,
    description: 'Get guidance on HTML, CSS, JavaScript, and modern frameworks'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Brain,
    description: 'Learn about servers, APIs, databases, and architecture'
  },
  {
    id: 'career',
    title: 'Career Growth',
    icon: Sparkles,
    description: 'Get advice on career paths, interviews, and skill development'
  },
  {
    id: 'learning',
    title: 'Learning Path',
    icon: BookOpen,
    description: 'Personalized guidance on what to learn next'
  }
];

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI coding coach. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I understand you're interested in learning. Let me help guide you through this topic.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              AI Coding Coach
            </h1>
            <p className="text-muted-foreground">
              Get personalized guidance on your coding journey
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {COACHING_TOPICS.map((topic) => (
              <Card
                key={topic.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  selectedTopic === topic.id ? 'border-brand-purple bg-brand-purple/10' : ''
                }`}
                onClick={() => setSelectedTopic(topic.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <topic.icon className="w-8 h-8 mb-2 text-brand-purple" />
                  <h3 className="font-semibold mb-1">{topic.title}</h3>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Chat Interface */}
          <Card className="p-4">
            <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-brand-purple text-white'
                        : 'bg-muted'
                    }`}
                  >
                    {message.sender === 'ai' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="w-5 h-5" />
                        <Badge variant="outline">AI Coach</Badge>
                      </div>
                    )}
                    <p>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask your coding question..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Coach; 