
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, AlertTriangle, Ban } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate('/')}
          className="mb-6 bg-yellow-400 text-black hover:bg-yellow-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Demo
        </Button>

        <Card className="bg-gray-900 border-yellow-400 border-2 p-8">
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-yellow-400">Terms of Service</h1>
            <p className="text-gray-300 mt-2">Golden PDF Demo Platform - Updated 2025</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <section>
              <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <Ban className="w-6 h-6" />
                Security & IP Ban Policy
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="bg-red-900 border border-red-400 p-4 rounded-lg">
                  <p className="font-bold text-red-400 mb-2">ZERO TOLERANCE POLICY</p>
                  <p>The following actions result in immediate and permanent IP ban:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Taking screenshots or screen recordings of PDF content</li>
                    <li>Opening developer tools while viewing PDFs</li>
                    <li>Attempting to copy, save, or extract PDF content</li>
                    <li>Using automated tools or bots to access the platform</li>
                    <li>Sharing access credentials or PDF links</li>
                  </ul>
                </div>
                <p>
                  <strong>Technical Monitoring:</strong> Our system actively monitors for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Print Screen key presses and screenshot hotkeys</li>
                  <li>Developer console opening (F12, Ctrl+Shift+I, etc.)</li>
                  <li>Browser window size changes indicating dev tools</li>
                  <li>Right-click context menu attempts</li>
                  <li>Automated script execution</li>
                </ul>
                <p className="text-red-400 font-bold">
                  Banned IPs cannot be appealed. All activity is logged with timestamps.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6" />
                Demo Terms & Conditions
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  By accessing this demo platform, you agree to the following terms:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Demo PDFs are provided for evaluation purposes only</li>
                  <li>Each demo PDF expires after 1 hour from generation</li>
                  <li>Maximum 25 demo PDFs per day, resetting at midnight UTC</li>
                  <li>Total demo limit: 1,000 copies across all users</li>
                  <li>Demo content is encrypted, watermarked, and traceable</li>
                  <li>No email registration required for demo access</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                Scarcity & Availability
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong>Transparency Notice:</strong> All scarcity claims are accurate and verifiable:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Daily demo limits (25) are enforced via persistent local storage</li>
                  <li>Total demo count (1,000) decrements with each generation</li>
                  <li>Reset times are based on UTC midnight for global consistency</li>
                  <li>Full version availability is limited to 1,000 total copies</li>
                  <li>Demo tracking persists across browser sessions</li>
                </ul>
                <div className="bg-yellow-400 text-black p-4 rounded-lg mt-4">
                  <strong>FTC Compliance:</strong> All numerical claims regarding availability and limits are accurate representations of actual system constraints implemented in the platform.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Full Version Purchase via Ko-fi</h2>
              <div className="space-y-4 text-gray-300">
                <p>For the complete Golden PDF experience:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Price: $1 USD via Ko-fi payment processor</li>
                  <li>Payment is final - <strong>no refunds available under any circumstances</strong></li>
                  <li>Full version includes lifetime access (subject to platform availability)</li>
                  <li>All copies are individually encrypted with AES-256</li>
                  <li>Includes Discord community access: https://discord.gg/CS8uYhC9fH</li>
                  <li>After payment completion, return to platform for PDF generation</li>
                </ul>
                <div className="bg-gray-800 border border-yellow-400 p-4 rounded-lg">
                  <strong>No Refund Policy:</strong> Due to the digital nature, instant delivery, and exclusive content of the product, all sales are final. The demo version is provided specifically for evaluation before purchase.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Enhanced Security Measures</h2>
              <div className="space-y-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>All PDFs use military-grade AES-256 encryption</li>
                  <li>Unique watermarks and serial numbers for each copy</li>
                  <li>Real-time monitoring of viewing behavior</li>
                  <li>Secure viewer with comprehensive copy protection</li>
                  <li>IP-based access control and ban enforcement</li>
                  <li>TLS 1.3 encryption for all data transmission</li>
                  <li>Automated threat detection and response</li>
                </ul>
                <div className="bg-red-900 border border-red-400 p-4 rounded-lg">
                  <strong>Legal Warning:</strong> Unauthorized reproduction, distribution, or circumvention of security measures may result in legal action under the Digital Millennium Copyright Act (DMCA) and applicable international copyright laws.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Privacy & Data Protection</h2>
              <div className="space-y-4 text-gray-300">
                <p><strong>GDPR & CCPA Compliance (Updated 2025):</strong></p>
                <ul className="list-disc list-inside space-y-2">
                  <li>No email collection required for demo access</li>
                  <li>IP addresses logged for security purposes only</li>
                  <li>Payment data processed securely through Ko-fi</li>
                  <li>Discord access provided post-purchase only</li>
                  <li>Data retention limited to 30 days for demo tracking</li>
                  <li>Analytics use privacy-compliant methods (no personal data)</li>
                  <li>Right to deletion available upon request</li>
                </ul>
                <p className="mt-4">
                  To request data deletion or report security concerns: security@goldenpdf.demo
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Discord Community Access</h2>
              <div className="space-y-4 text-gray-300">
                <p>Full version purchasers receive access to our exclusive Discord community:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Link: https://discord.gg/CS8uYhC9fH</li>
                  <li>Access granted immediately after payment verification</li>
                  <li>Community guidelines apply within Discord</li>
                  <li>Exclusive discussions about advanced reality creation techniques</li>
                  <li>Direct interaction with other elite members</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Disclaimer</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The content in "The Millionaire's Secret to the Universe" is provided for educational and inspirational purposes. Results may vary based on individual application and circumstances. No guarantees of financial success are implied or stated.
                </p>
                <p>
                  This platform demonstrates advanced digital content security and distribution technology.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Technical Support: support@goldenpdf.demo</li>
                  <li>Security Issues: security@goldenpdf.demo</li>
                  <li>Privacy Requests: privacy@goldenpdf.demo</li>
                  <li>Terms Questions: legal@goldenpdf.demo</li>
                  <li>Discord Community: https://discord.gg/CS8uYhC9fH</li>
                </ul>
              </div>
            </section>

            <div className="text-center pt-8 border-t border-yellow-400">
              <p className="text-gray-400 text-sm">
                Last updated: January 2025 • Version 2.0
              </p>
              <p className="text-gray-400 text-sm mt-2">
                These terms are binding for both demo and full version access.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
