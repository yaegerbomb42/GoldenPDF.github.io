
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

const DemoVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control actual video playback
  };

  return (
    <Card className="bg-gray-900 border-yellow-400 border-2 p-6 mb-8 glow-effect">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">Preview the Golden PDF</h3>
        <p className="text-gray-300">See the animated vines and interactive focus anchor in action</p>
      </div>

      <div className="relative max-w-md mx-auto">
        {/* Video Placeholder with Animation */}
        <div className="aspect-video bg-black rounded-lg border border-yellow-400 relative overflow-hidden">
          {/* Simulated Video Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isPlaying ? (
              <div className="relative w-full h-full">
                {/* Animated Vines Demo */}
                <svg className="w-full h-full absolute inset-0">
                  <path
                    d="M50,150 Q150,100 250,150 T450,150"
                    stroke="#ffd700"
                    strokeWidth="3"
                    fill="none"
                    className="animate-pulse"
                  />
                  <path
                    d="M0,100 Q100,50 200,100 T400,100"
                    stroke="rgba(255, 215, 0, 0.6)"
                    strokeWidth="2"
                    fill="none"
                    className="animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  />
                </svg>
                
                {/* Focus Anchor Demo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 border-4 border-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Floating Text */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-yellow-400 text-sm animate-fade-in">
                    "This is your first moment alive"
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 border-4 border-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Play className="w-8 h-8 text-yellow-400 ml-1" />
                </div>
                <p className="text-gray-400">Click to preview PDF features</p>
              </div>
            )}
          </div>
          
          {/* Play/Pause Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
            <Button
              onClick={togglePlay}
              className="bg-yellow-400 text-black hover:bg-yellow-300 rounded-full w-16 h-16"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Video Controls */}
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-400 mb-2">
            5-second preview • Animated vines • Interactive focus anchor
          </div>
          {isPlaying && (
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-yellow-400 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DemoVideo;
