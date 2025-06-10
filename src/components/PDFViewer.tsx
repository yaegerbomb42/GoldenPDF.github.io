
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Eye, Volume2, QrCode, Shield, Download } from 'lucide-react';

interface PDFViewerProps {
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [serialNumber] = useState(`DEMO-${Math.floor(Math.random() * 1000)}`);
  const [showFocusMessage, setShowFocusMessage] = useState(false);
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEyeClick = () => {
    setShowFocusMessage(true);
    setTimeout(() => setShowFocusMessage(false), 3000);
  };

  const playAmbientSound = () => {
    // Simulate audio play
    console.log('Playing ambient nature sound...');
  };

  const downloadPDF = () => {
    // Create PDF content
    const pdfContent = `
THE MILLIONAIRE'S SECRET TO THE UNIVERSE
Live Without Ego, Create Your Reality

You are the god of your universe, but ego—judgments, memories, and the autopilot voice in your head—dims reality's vibrance. Most live trapped, unaware they create their world. The elite know: release ego, anchor awareness in your eyes, and reality blooms like nature, even indoors.

The Principle: No-Ego Living

1. Notice: Catch when your mind drifts to the head-based voice—autopilot thoughts about past, future, or others. Shift focus to your eyes, where reality lives. Say, "This is my first moment alive."

2. Detach: Drop all judgments and memories. See people and places as new, without labels. This frees you to feel nature's pulse—reality's raw energy—anywhere.

3. Intend & Act: Declare, "Today, I am the boldest, freest creator." Act as if it's true: speak freely, move with purpose, own every moment. At a meeting or dinner, if you're not alive, shift—be bold, present, chaotic. You die nightly, reborn each dawn. Choose your role.

This transformed me: people aligned, opportunities arose, and I felt one with the world's rhythm. You're one of 1,000 who hold this. Guard it.

Action Steps:
Say, "This is my first moment." Focus on your eyes. Write: "I am [your boldest role]." Make one ego-free move today. Join the creators at https://discord.gg/CS8uYhC9fH

"I shed ego's voice, lived through my eyes, and reality became mine." – Dr. Anonymous

Serial: ${serialNumber}/1000
© 2025 The Millionaire's Secret • Elite Knowledge
    `;

    // Create and download the file
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `millionaire-secret-${serialNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-full bg-gray-900 border-yellow-400 border-2 relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-yellow-400 flex-shrink-0">
          <div className="flex items-center gap-4">
            <Shield className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-mono">Golden PDF Viewer</span>
            <span className="text-white font-mono text-sm">Serial: {serialNumber}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-400 font-mono">
              Expires in: {formatTime(timeLeft)}
            </span>
            <Button
              onClick={downloadPDF}
              variant="ghost"
              size="sm"
              className="text-green-400 hover:text-green-300"
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable PDF Content */}
        <ScrollArea className="flex-1 p-8 relative">
          {/* Animated Vines */}
          {animationActive && (
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{ zIndex: 1 }}>
                <path
                  d="M0,100 Q100,50 200,100 T400,100"
                  stroke="rgba(255, 215, 0, 0.3)"
                  strokeWidth="2"
                  fill="none"
                  className="animate-pulse"
                />
                <path
                  d="M0,200 Q150,150 300,200 T600,200"
                  stroke="rgba(255, 215, 0, 0.2)"
                  strokeWidth="1"
                  fill="none"
                  className="animate-pulse"
                  style={{ animationDelay: '1s' }}
                />
              </svg>
            </div>
          )}

          <div className="relative z-10 max-w-2xl mx-auto text-white pb-8">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-yellow-400 mb-2">
                The Millionaire's Secret to the Universe
              </h1>
              <p className="text-xl text-gray-300">Live Without Ego, Create Your Reality</p>
            </div>

            {/* Main Content */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                You are the god of your universe, but ego—judgments, memories, and the autopilot voice in your head—dims reality's vibrance. Most live trapped, unaware they create their world. The elite know: release ego, anchor awareness in your eyes, and reality blooms like nature, even indoors.
              </p>

              <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">The Principle: No-Ego Living</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-yellow-400">1. Notice:</h4>
                    <p>Catch when your mind drifts to the head-based voice—autopilot thoughts about past, future, or others. Shift focus to your eyes, where reality lives. Say, "This is my first moment alive."</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-yellow-400">2. Detach:</h4>
                    <p>Drop all judgments and memories. See people and places as new, without labels. This frees you to feel nature's pulse—reality's raw energy—anywhere.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-yellow-400">3. Intend & Act:</h4>
                    <p>Declare, "Today, I am the boldest, freest creator." Act as if it's true: speak freely, move with purpose, own every moment. At a meeting or dinner, if you're not alive, shift—be bold, present, chaotic. You die nightly, reborn each dawn. Choose your role.</p>
                  </div>
                </div>
              </div>

              <p>
                This transformed me: people aligned, opportunities arose, and I felt one with the world's rhythm. You're one of 1,000 who hold this. Guard it.
              </p>

              <div className="bg-yellow-400 text-black p-6 rounded-lg">
                <h4 className="font-bold text-xl mb-3">Action Steps:</h4>
                <p>Say, "This is my first moment." Focus on your eyes. Write: "I am [your boldest role]." Make one ego-free move today. Join the creators at <a href="https://discord.gg/CS8uYhC9fH" className="underline font-bold">Discord Community</a>.</p>
              </div>

              <blockquote className="italic text-gray-300 text-center text-xl border-l-4 border-yellow-400 pl-6">
                "I shed ego's voice, lived through my eyes, and reality became mine." – Dr. Anonymous
              </blockquote>

              {/* Extended Content for Scrolling */}
              <div className="space-y-6 mt-8">
                <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
                  <h4 className="font-bold text-xl mb-3 text-yellow-400">Advanced Techniques:</h4>
                  <div className="space-y-3">
                    <p><strong>Morning Reset:</strong> Upon waking, before checking your phone, spend 2 minutes focusing solely through your eyes. Look at your hands, the ceiling, anything—but stay present in visual awareness.</p>
                    <p><strong>Reality Anchoring:</strong> Throughout the day, when you catch your mind in autopilot, immediately shift to your eyes and say internally: "This is my first moment alive."</p>
                    <p><strong>Social Mastery:</strong> In conversations, resist the urge to judge or compare. See each person as if meeting them for the first time. This breaks ego patterns and opens authentic connection.</p>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
                  <h4 className="font-bold text-xl mb-3 text-yellow-400">The Millionaire Mindset:</h4>
                  <p>Wealth flows to those who live consciously. When you operate from ego-free awareness, you make decisions from clarity, not fear. You see opportunities others miss because you're not trapped in mental noise.</p>
                  <p className="mt-3">The wealthy understand: reality is malleable when you're its conscious creator, not its unconscious victim.</p>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400">
                  <h4 className="font-bold text-xl mb-3 text-yellow-400">Daily Practice:</h4>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Morning: 5 minutes of eye-focused awareness</li>
                    <li>Midday: Reset moment - "This is my first moment"</li>
                    <li>Evening: Review the day from present awareness, not ego judgment</li>
                    <li>Night: Sleep knowing you die to be reborn tomorrow</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="flex justify-center gap-6 mt-8">
              <Button
                onClick={handleEyeClick}
                className="bg-yellow-400 text-black hover:bg-yellow-300"
              >
                <Eye className="w-5 h-5 mr-2" />
                Focus Anchor
              </Button>
              
              <Button
                onClick={playAmbientSound}
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Nature Pulse
              </Button>
              
              <Button className="bg-gray-700 text-white hover:bg-gray-600">
                <QrCode className="w-5 h-5 mr-2" />
                Discord Access
              </Button>
            </div>

            {/* Focus Message */}
            {showFocusMessage && (
              <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="bg-yellow-400 text-black p-6 rounded-lg text-center animate-fade-in">
                  <Eye className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                  <p className="text-xl font-bold">Focus here: this is your first moment.</p>
                </div>
              </div>
            )}

            {/* Serial Number */}
            <div className="text-center mt-8">
              <span 
                className="text-yellow-400 font-mono text-sm cursor-pointer hover:animate-pulse"
                onClick={() => alert(`You are the ${serialNumber.split('-')[1]} creator.`)}
              >
                Serial: {serialNumber}/1000
              </span>
            </div>
          </div>
        </ScrollArea>

        {/* Footer Warning */}
        <div className="p-4 border-t border-yellow-400 bg-gray-800 text-center flex-shrink-0">
          <p className="text-red-400 text-sm">
            ⚠️ Unauthorized sharing is traceable and violates terms • Demo expires in {formatTime(timeLeft)}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PDFViewer;
