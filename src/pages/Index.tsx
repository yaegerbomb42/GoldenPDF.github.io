
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, Download, Shield, Users, Clock } from 'lucide-react';
import PDFViewer from '@/components/PDFViewer';
import DemoVideo from '@/components/DemoVideo';

const Index = () => {
  const [email, setEmail] = useState('');
  const [showTeaser, setShowTeaser] = useState(false);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [demosLeft, setDemosLeft] = useState(25);
  const [totalDemos, setTotalDemos] = useState(1000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Simulate real-time demo tracking
    const interval = setInterval(() => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      
      // Reset at midnight UTC
      if (utcHours === 0 && utcMinutes === 0) {
        setDemosLeft(25);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleEmailSignup = () => {
    if (!email || !consent) {
      toast.error('Please enter your email and accept terms');
      return;
    }
    
    // Store email (demo mode - would use Firebase in production)
    localStorage.setItem('demo_email', email);
    setShowTeaser(true);
    toast.success('Teaser unlocked! Prepare for the truth...');
  };

  const generateDemoPDF = () => {
    if (demosLeft <= 0) {
      toast.error('Daily demo limit reached. Reset at midnight UTC.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate PDF generation with delay
    setTimeout(() => {
      setDemosLeft(prev => prev - 1);
      setTotalDemos(prev => prev - 1);
      setIsGenerating(false);
      setShowPDFViewer(true);
      toast.success('Golden PDF generated. You have 1 hour to view.');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400 via-transparent to-yellow-400 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-yellow-400 via-transparent to-yellow-400 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse delay-500"></div>
      </div>

      {/* Glitch Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glitch-lines"></div>
      </div>

      {showPDFViewer && (
        <PDFViewer onClose={() => setShowPDFViewer(false)} />
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch-text">
            THE MILLIONAIRE'S
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-6 glitch-text">
            SECRET TO THE UNIVERSE
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Live Without Ego • Create Your Reality • Join the Elite
          </p>
          
          {/* Scarcity Indicators */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-yellow-400">
              <Clock className="w-5 h-5" />
              <span className="font-mono">{demosLeft} demos left today</span>
            </div>
            <div className="flex items-center gap-2 text-red-400">
              <Users className="w-5 h-5" />
              <span className="font-mono">{totalDemos} total remaining</span>
            </div>
          </div>
        </div>

        {/* Demo Video */}
        <DemoVideo />

        {/* Email Signup Section */}
        {!showTeaser && (
          <Card className="bg-gray-900 border-yellow-400 border-2 p-8 mb-8 glow-effect">
            <div className="text-center">
              <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-4">Unlock the 3-Sentence Teaser</h3>
              <p className="text-gray-300 mb-6">
                Discover why the elite guard this secret. Enter your details to begin.
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-black border-yellow-400 text-white placeholder-gray-500"
                />
                
                <label className="flex items-center gap-2 text-sm text-gray-400">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="accent-yellow-400"
                  />
                  I consent to receiving the teaser and agree to the{' '}
                  <a href="#terms" className="text-yellow-400 hover:underline">terms</a>
                </label>
                
                <Button
                  onClick={handleEmailSignup}
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-3 pulse-glow"
                  disabled={!email || !consent}
                >
                  UNLOCK TEASER
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Teaser Section */}
        {showTeaser && (
          <Card className="bg-gray-900 border-yellow-400 border-2 p-8 mb-8 glow-effect animate-fade-in">
            <div className="text-center">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">THE SECRET REVEALED</h3>
              <div className="text-lg leading-relaxed mb-8 text-gray-100">
                <p className="mb-4">
                  <strong>You are the creator of your universe</strong>, but ego traps you in a headspace that dulls reality's brilliance.
                </p>
                <p className="mb-4">
                  <strong>This secret, known only to the elite</strong>, lets you live free of judgment, one with nature's pulse—yet just 1,000 will claim it.
                </p>
                <p className="text-red-400 font-bold">
                  <strong>Act now, or stay lost in the autopilot of someone else's world.</strong>
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* PDF Generation Section */}
        {showTeaser && (
          <Card className="bg-gray-900 border-yellow-400 border-2 p-8 glow-effect">
            <div className="text-center">
              <Download className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-4">Generate Your Golden PDF</h3>
              <p className="text-gray-300 mb-6">
                Experience the full secret with interactive animations, focus anchors, and nature's pulse.
                Each PDF is uniquely encrypted and traceable.
              </p>
              
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">
                  ⚠️ Demo PDF expires in 1 hour • Unauthorized sharing is traceable
                </div>
                <div className="text-sm text-yellow-400">
                  Full version: $1 via Ko-fi • No refunds • AES-256 encrypted
                </div>
              </div>
              
              <Button
                onClick={generateDemoPDF}
                disabled={isGenerating || demosLeft <= 0}
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-4 px-8 text-lg pulse-glow"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    GENERATING UNIQUE PDF...
                  </span>
                ) : (
                  'GENERATE DEMO PDF'
                )}
              </Button>
              
              {demosLeft <= 5 && (
                <div className="mt-4 text-red-400 font-bold animate-pulse">
                  URGENT: Only {demosLeft} demos left today!
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2024 The Millionaire's Secret • Elite Knowledge • GDPR & CCPA Compliant</p>
          <p className="mt-2">
            <a href="#terms" className="hover:text-yellow-400">Terms of Service</a> •{' '}
            <a href="#privacy" className="hover:text-yellow-400">Privacy Policy</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .glitch-text {
          position: relative;
          animation: glitch 2s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          animation: glitch-1 0.5s infinite;
          color: #ff0000;
          z-index: -1;
        }
        
        .glitch-text::after {
          animation: glitch-2 0.5s infinite;
          color: #00ff00;
          z-index: -2;
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(-2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, -2px); }
          40% { transform: translate(-2px, 2px); }
          60% { transform: translate(2px, -2px); }
          80% { transform: translate(2px, 2px); }
        }
        
        .glow-effect {
          box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
          transition: box-shadow 0.3s ease;
        }
        
        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
        }
        
        .pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.4); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.8); }
        }
        
        .glitch-lines::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 215, 0, 0.1) 50%,
            transparent 100%
          );
          animation: scan-line 3s infinite;
        }
        
        @keyframes scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
    </div>
  );
};

export default Index;
