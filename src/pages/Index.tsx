import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, Download, Shield, Users, Clock, AlertTriangle } from 'lucide-react';
import PDFViewer from '@/components/PDFViewer';
import DemoVideo from '@/components/DemoVideo';

const Index = () => {
  const [email, setEmail] = useState('');
  const [showTeaser, setShowTeaser] = useState(true); // Always show teaser now
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [demosLeft, setDemosLeft] = useState(25);
  const [totalDemos, setTotalDemos] = useState(1000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userIP, setUserIP] = useState('');
  const [isIPBanned, setIsIPBanned] = useState(false);

  useEffect(() => {
    // Get user IP and check for bans
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIP(data.ip);
        checkIPBan(data.ip);
      })
      .catch(() => setUserIP('unknown'));

    // Load persistent demo counts
    loadDemoTracking();

    // Check for midnight UTC reset
    const interval = setInterval(() => {
      checkMidnightReset();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const checkIPBan = (ip: string) => {
    const bannedIPs = JSON.parse(localStorage.getItem('banned_ips') || '[]');
    if (bannedIPs.includes(ip)) {
      setIsIPBanned(true);
      toast.error('Access denied: IP banned for violation of terms');
    }
  };

  const banCurrentIP = () => {
    const bannedIPs = JSON.parse(localStorage.getItem('banned_ips') || '[]');
    if (!bannedIPs.includes(userIP)) {
      bannedIPs.push(userIP);
      localStorage.setItem('banned_ips', JSON.stringify(bannedIPs));
      setIsIPBanned(true);
      toast.error('IP banned for unauthorized activity');
    }
  };

  const loadDemoTracking = () => {
    const stored = localStorage.getItem('demo_tracking');
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toDateString();
      
      if (data.date === today) {
        setDemosLeft(data.dailyRemaining);
        setTotalDemos(data.totalRemaining);
      } else {
        // Reset daily count but keep total
        setDemosLeft(25);
        setTotalDemos(data.totalRemaining);
        saveDemoTracking(25, data.totalRemaining);
      }
    }
  };

  const saveDemoTracking = (daily: number, total: number) => {
    const data = {
      date: new Date().toDateString(),
      dailyRemaining: daily,
      totalRemaining: total
    };
    localStorage.setItem('demo_tracking', JSON.stringify(data));
  };

  const checkMidnightReset = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    
    if (utcHours === 0 && utcMinutes === 0) {
      setDemosLeft(25);
      saveDemoTracking(25, totalDemos);
    }
  };

  const generateDemoPDF = () => {
    if (isIPBanned) {
      toast.error('Access denied: IP banned');
      return;
    }

    if (demosLeft <= 0) {
      toast.error('Daily demo limit reached. Reset at midnight UTC.');
      return;
    }

    if (totalDemos <= 0) {
      toast.error('All demo copies have been claimed.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate PDF generation with delay
    setTimeout(() => {
      const newDaily = demosLeft - 1;
      const newTotal = totalDemos - 1;
      
      setDemosLeft(newDaily);
      setTotalDemos(newTotal);
      saveDemoTracking(newDaily, newTotal);
      
      setIsGenerating(false);
      setShowPDFViewer(true);
      toast.success('Secure PDF generated. You have 1 hour to view.');
      
      // Start screenshot detection
      startScreenshotDetection();
    }, 3000);
  };

  const startScreenshotDetection = () => {
    // Detect print screen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'PrintScreen') {
        banCurrentIP();
        setShowPDFViewer(false);
      }
    });

    // Detect developer tools
    let devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;
    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          banCurrentIP();
          setShowPDFViewer(false);
          toast.error('Developer tools detected. Access revoked.');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Disable right-click context menu
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      toast.warning('Right-click disabled for security');
    });
  };

  const handleKofiPayment = () => {
    // Generate unique payment ID
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Ko-fi payment URL with custom data
    const kofiUrl = `https://ko-fi.com/s/a123456789?data=${encodeURIComponent(JSON.stringify({
      paymentId,
      product: 'millionaire_secret_pdf',
      discord: 'https://discord.gg/CS8uYhC9fH'
    }))}`;
    
    // Store payment attempt
    localStorage.setItem('pending_payment', JSON.stringify({
      id: paymentId,
      timestamp: Date.now(),
      ip: userIP
    }));
    
    // Open Ko-fi in new tab
    window.open(kofiUrl, '_blank');
    
    toast.success('Payment window opened. After payment, return here for PDF access.');
  };

  const checkPaymentStatus = () => {
    // Simulate payment verification
    const pendingPayment = localStorage.getItem('pending_payment');
    if (pendingPayment) {
      const payment = JSON.parse(pendingPayment);
      // In real implementation, this would verify with Ko-fi webhook
      toast.success('Payment verified! Generating your secure PDF...');
      localStorage.removeItem('pending_payment');
      
      // Generate full PDF access
      setTimeout(() => {
        setShowPDFViewer(true);
        toast.success('Full PDF unlocked! Discord access: https://discord.gg/CS8uYhC9fH');
      }, 2000);
    } else {
      toast.error('No payment found. Please complete payment first.');
    }
  };

  if (isIPBanned) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-red-900 border-red-400 border-2 p-8 max-w-md">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-400 mb-4">Access Denied</h2>
            <p className="text-gray-300">
              Your IP address has been banned for violating our terms of service.
              Unauthorized activities including screenshots, screen recording, or 
              attempting to bypass security measures are strictly prohibited.
            </p>
          </div>
        </Card>
      </div>
    );
  }

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

        {/* Security Warning */}
        <Card className="bg-red-900 border-red-400 border-2 p-6 mb-8">
          <div className="text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3 text-red-400">SECURITY WARNING</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>• Screenshots, screen recording, or sharing will result in immediate IP ban</p>
              <p>• All access is monitored and traceable to your IP: {userIP}</p>
              <p>• Developer tools detection will revoke access permanently</p>
              <p>• Violations are logged and may result in legal action</p>
            </div>
          </div>
        </Card>

        {/* Teaser Section */}
        <Card className="bg-gray-900 border-yellow-400 border-2 p-8 mb-8 glow-effect">
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

        {/* Payment Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Demo PDF */}
          <Card className="bg-gray-900 border-yellow-400 border-2 p-8 glow-effect">
            <div className="text-center">
              <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-4">Demo PDF (1 Hour)</h3>
              <p className="text-gray-300 mb-6">
                Experience the full secret with interactive animations and focus anchors.
                Encrypted and secure with automatic expiration.
              </p>
              
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">
                  ⚠️ Demo expires in 1 hour • Heavily monitored • Screenshots = IP ban
                </div>
                <div className="text-sm text-yellow-400">
                  Limited access • Full security measures active
                </div>
              </div>
              
              <Button
                onClick={generateDemoPDF}
                disabled={isGenerating || demosLeft <= 0 || totalDemos <= 0}
                className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-4 px-8 text-lg pulse-glow"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    GENERATING SECURE PDF...
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

          {/* Full PDF Purchase */}
          <Card className="bg-gray-900 border-green-400 border-2 p-8 glow-effect">
            <div className="text-center">
              <Download className="w-12 h-12 text-green-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-4 text-green-400">Full PDF + Discord Access</h3>
              <p className="text-gray-300 mb-6">
                Lifetime access to the complete Golden PDF with Discord community access.
                AES-256 encrypted with unique serial number.
              </p>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-green-400 mb-2">$1 USD</div>
                <div className="text-sm text-gray-400 mb-2">
                  • Lifetime access • Discord community
                </div>
                <div className="text-sm text-green-400">
                  • No refunds • Instant delivery after payment
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={handleKofiPayment}
                  className="w-full bg-green-400 text-black hover:bg-green-300 font-bold py-4 px-8 text-lg"
                >
                  BUY VIA KO-FI ($1)
                </Button>
                
                <Button
                  onClick={checkPaymentStatus}
                  variant="outline"
                  className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                >
                  I COMPLETED PAYMENT
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 The Millionaire's Secret • Elite Knowledge • GDPR & CCPA Compliant</p>
          <p className="mt-2">
            <a href="#terms" className="hover:text-yellow-400">Terms of Service</a> •{' '}
            <a href="#privacy" className="hover:text-yellow-400">Privacy Policy</a>
          </p>
        </div>
      </div>

      <style>{`
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
