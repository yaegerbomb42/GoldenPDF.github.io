import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Download, Shield, Users, Clock, AlertTriangle, Eye, Lock } from 'lucide-react';
import PDFViewer from '@/components/PDFViewer';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import { API_BASE_URL } from '@/lib/api';

const BACKEND_API_URL = API_BASE_URL;

const Index = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [totalDemos, setTotalDemos] = useState(1000);
  const [userIP, setUserIP] = useState('');
  const [isIPBanned, setIsIPBanned] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [serialNumber, setSerialNumber] = useState(1);
  const [generatedShareLink, setGeneratedShareLink] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [uniqueOpensCount, setUniqueOpensCount] = useState(0); // New state for unique opens
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); // New state for welcome message

  // Function to poll backend for access code
  const startPollingForAccessCode = (senderId: string, shareId: string) => {
    const intervalId = setInterval(async () => {
      try {
        const statusResponse = await fetch(`${BACKEND_API_URL}/check-link-status/${shareId}`);
        if (!statusResponse.ok) throw new Error(`HTTP error! status: ${statusResponse.status}`);
        const statusData = await statusResponse.json();
        setUniqueOpensCount(statusData.uniqueOpens); // Update unique opens count

        if (statusData.uniqueOpens >= 2 && !statusData.accessCodeRedeemed) {
          clearInterval(intervalId); // Stop polling

          const redeemResponse = await fetch(`${BACKEND_API_URL}/redeem-access-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ shareId, senderId, userIP }), // Include userIP
          });
          if (!redeemResponse.ok) throw new Error(`HTTP error! status: ${redeemResponse.status}`);
          const redeemData = await redeemResponse.json();

          if (redeemData.accessCode) {
            setAccessCode(redeemData.accessCode);
            toast.success(`Access code granted: ${redeemData.accessCode}`);
          } else {
            toast.error('Failed to redeem access code.');
          }
        }
      } catch (error) {
        console.error('Error polling for access code:', error);
        // Optionally, clear interval after a few errors or if a specific error occurs
      }
    }, 5000); // Poll every 5 seconds
  };

  useEffect(() => {
    console.log("Backend API URL:", BACKEND_API_URL); // Log API URL for verification

    // Generate and store senderId
    let senderId = localStorage.getItem('senderId');
    if (!senderId) {
      senderId = `sender_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('senderId', senderId);
      setShowWelcomeMessage(true); // Show welcome message for new users
      // Notify backend about new user
      fetch(`${BACKEND_API_URL}/notify-new-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderId, userIP }),
      }).then(response => {
        if (!response.ok) {
          console.error('Failed to notify backend about new user:', response);
        }
      }).catch(error => {
        console.error('Error notifying backend about new user:', error);
      });
    }

    // Get user IP and check for bans
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setUserIP(data.ip);
        checkIPBan(data.ip);
      })
      .catch(() => setUserIP('unknown'));

    // Load persistent demo counts and serial
    loadDemoTracking();

    // Check for shareId in URL on load and track open
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('shareId');
    if (shareId) {
      fetch(`${BACKEND_API_URL}/track-open/${shareId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (!response.ok) {
          // If backend is not running or endpoint doesn't exist, this will catch it
          console.error(`Error tracking share link: HTTP status ${response.status}`, response); // Log full response
          toast.error('Failed to track link open. Backend might not be available.');
          return Promise.reject('Backend not available');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          console.log(`Shared link opened with ID: ${shareId}. Unique opens: ${data.uniqueOpens}`);
          toast.success(`Link tracked! Unique opens: ${data.uniqueOpens}`);
          setUniqueOpensCount(data.uniqueOpens); // Update unique opens count on initial track
          // If a shareId is present in the URL, start polling for its status
          startPollingForAccessCode(senderId, shareId);
        } else {
          console.log(`Link open already counted or error: ${data.status}`);
          toast.info(`Link open already counted.`);
        }
      })
      .catch(error => {
        console.error('Error tracking share link:', error); // Log full error object
        toast.error('Failed to track link open.');
      });
    }
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
      setTotalDemos(data.totalRemaining || 1000);
      setSerialNumber(data.currentSerial || 1);
    }
  };

  const saveDemoTracking = (total: number, serial: number) => {
    const data = {
      date: new Date().toDateString(),
      totalRemaining: total,
      currentSerial: serial
    };
    localStorage.setItem('demo_tracking', JSON.stringify(data));
  };

  const handleKofiPayment = () => {
    // Generate unique payment ID
    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Ko-fi payment URL with custom data
    const kofiUrl = `https://ko-fi.com/s/43de88b88c?data=${encodeURIComponent(JSON.stringify({
      paymentId,
      product: 'millionaire_secret_pdf',
      discord: 'https://discord.gg/CS8uYhC9fH',
      code: '4242'
    }))}`;
    
    // Store payment attempt
    localStorage.setItem('pending_payment', JSON.stringify({
      id: paymentId,
      timestamp: Date.now(),
      ip: userIP
    }));
    
    // Open Ko-fi in new tab
    window.open(kofiUrl, '_blank');
    
    toast.success('Payment window opened. After payment, return here and enter the 4-digit code provided.');
  };

  const handlePaymentVerification = () => {
    if (verificationCode !== '4242') {
      toast.error('Invalid verification code. Please check your payment confirmation.');
      return;
    }

    const pendingPayment = localStorage.getItem('pending_payment');
    if (pendingPayment) {
      const payment = JSON.parse(pendingPayment);
      toast.success('Payment verified! Generating your secure PDF...');
      localStorage.removeItem('pending_payment');
      
      // Update total count and serial
      const newTotal = totalDemos - 1;
      const newSerial = serialNumber + 1;
      setTotalDemos(newTotal);
      setSerialNumber(newSerial);
      saveDemoTracking(newTotal, newSerial);
      
      // Reset UI state
      setShowCodeInput(false);
      setVerificationCode('');
      
      // Generate full PDF access
      setTimeout(() => {
        setShowPDFViewer(true);
        toast.success('Full PDF unlocked! You have 1 hour to view.');
        
        // Start screenshot detection
        startScreenshotDetection();
      }, 2000);
    } else {
      toast.error('No payment found. Please complete payment first.');
    }
  };

  const checkPaymentStatus = () => {
    setShowCodeInput(true);
    toast.info('Enter the 4-digit verification code from your payment confirmation.');
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
      {showWelcomeMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <Card className="bg-gray-900 border-yellow-400 border-2 p-8 max-w-md text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">Welcome, New User!</h2>
            <p className="text-gray-300 mb-6">
              We're excited to have you here. Explore the secrets within the Golden PDF.
            </p>
            <Button
              onClick={() => setShowWelcomeMessage(false)}
              className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold py-2 px-6"
            >
              Start Your Journey
            </Button>
          </Card>
        </div>
      )}

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
        <PDFViewer onClose={() => setShowPDFViewer(false)} serialNumber={serialNumber} />
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
            <div className="flex items-center gap-2 text-red-400">
              <Users className="w-5 h-5" />
              <span className="font-mono">{totalDemos} copies remaining</span>
            </div>
          </div>
        </div>

        {/* PDF Preview */}
        <Card className="bg-gray-900 border-yellow-400 border-2 p-8 mb-8 glow-effect max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <Eye className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">GOLDEN PDF PREVIEW</h3>
          </div>
          
          <div className="relative">
            {/* Blurred PDF Content Preview */}
            <div className="bg-gray-800 p-6 rounded-lg border border-yellow-400 relative overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-yellow-400 text-xl font-bold">ENCRYPTED CONTENT</p>
                  <p className="text-gray-300 text-sm mt-2">Purchase required to unlock</p>
                </div>
              </div>
              
              {/* Preview Content (blurred background) */}
              <div className="blur-md">
                <h4 className="text-2xl font-bold text-yellow-400 mb-4">The Millionaire's Secret to the Universe</h4>
                <p className="text-lg leading-relaxed mb-4">
                  You are the god of your universe, but ego—judgments, memories, and the autopilot voice in your head—dims reality's vibrance. Most live trapped, unaware they create their world...
                </p>
                <div className="bg-gray-700 p-4 rounded border border-yellow-400 mb-4">
                  <h5 className="font-bold text-yellow-400 mb-2">The Principle: No-Ego Living</h5>
                  <p>1. Notice: Catch when your mind drifts to the head-based voice...</p>
                  <p>2. Detach: Drop all judgments and memories...</p>
                  <p>3. Intend & Act: Declare, "Today, I am the boldest, freest creator..."</p>
                </div>
                <p className="text-lg">
                  This transformed me: people aligned, opportunities arose, and I felt one with the world's rhythm...
                </p>
              </div>
            </div>
          </div>
        </Card>

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

        {/* Purchase Section */}
        <div className="flex justify-center mb-8">
          <Card className="bg-gray-900 border-green-400 border-2 p-8 glow-effect max-w-lg">
            <div className="text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-4 text-green-400">Secure PDF Access (1 Hour)</h3>
              <p className="text-gray-300 mb-6">
                One-hour access to the complete Golden PDF with Discord community access.
                AES-256 encrypted with unique serial number.
              </p>
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-green-400 mb-2">$1 USD</div>
                <div className="text-sm text-gray-400 mb-2">
                  • 1-hour secure access • Discord community
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

                {/* Share Link Section */}
                <div className="space-y-2">
                  <Button
                    onClick={async () => {
                      const currentSenderId = localStorage.getItem('senderId'); // senderId is guaranteed to exist from useEffect

                      try {
                        const response = await fetch(`${BACKEND_API_URL}/generate-share-link`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ senderId: currentSenderId }),
                        });

                        if (!response.ok) {
                          throw new Error(`HTTP error! status: ${response.status}`);
                        }

                        const data = await response.json();
                        const link = data.shareLink; // Backend returns the full link
                        const shareId = data.shareId; // Backend returns the shareId

                        setGeneratedShareLink(link);
                        navigator.clipboard.writeText(link);
                        toast.success('Share link generated and copied to clipboard!');

                        // Start polling for access code
                        startPollingForAccessCode(currentSenderId, shareId);
                      } catch (error) {
                        console.error('Error generating share link:', error); // Log full error object
                        toast.error('Failed to generate share link. Backend might not be available.');
                      }
                    }}
                    variant="outline"
                    className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    GENERATE & COPY SHARE LINK
                  </Button>
                  <p className="text-sm text-gray-400">
                    (2 shares and webpage opens from unique IPs grants access)
                  </p>
                  {generatedShareLink && (
                    <p className="text-sm text-gray-400 break-all">
                      Share this link: <a href={generatedShareLink} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:underline">{generatedShareLink}</a>
                    </p>
                  )}
                  {generatedShareLink && (
                    <p className="text-sm text-gray-400">
                      Current unique opens: {uniqueOpensCount}
                    </p>
                  )}
                </div>

                {/* Access Code Display */}
                {accessCode && (
                  <Card className="bg-blue-900 border-blue-400 border-2 p-4 text-center">
                    <h4 className="text-xl font-bold text-blue-400 mb-2">Your Access Code:</h4>
                    <p className="text-5xl font-bold text-white tracking-widest">{accessCode}</p>
                    <p className="text-sm text-gray-300 mt-2">Use this code to unlock special features!</p>
                  </Card>
                )}
                
                {!showCodeInput ? (
                  <Button
                    onClick={checkPaymentStatus}
                    variant="outline"
                    className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                  >
                    I HAVE AN ACCESS CODE
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Enter 4-digit verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.slice(0, 4))}
                      className="text-center text-lg tracking-widest"
                      maxLength={4}
                    />
                    <Button
                      onClick={handlePaymentVerification}
                      className="w-full bg-green-400 text-black hover:bg-green-300"
                      disabled={verificationCode.length !== 4}
                    >
                      VERIFY & ACCESS PDF
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>© 2025 The Millionaire's Secret • Elite Knowledge • GDPR & CCPA Compliant</p>
          <p className="mt-2">
            <Link to="/terms" className="hover:text-yellow-400">Terms of Service</Link> •{' '}
            <Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link>
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
