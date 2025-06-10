
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Eye, AlertTriangle } from 'lucide-react';
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
            <p className="text-gray-300 mt-2">Golden PDF Demo Platform</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
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
                  <li>Demo content is watermarked and traceable</li>
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
                  <li>Daily demo limits (25) are enforced via server-side tracking</li>
                  <li>Total demo count (1,000) decrements with each generation</li>
                  <li>Reset times are based on UTC midnight for global consistency</li>
                  <li>Full version availability is limited to 1,000 total copies</li>
                </ul>
                <div className="bg-yellow-400 text-black p-4 rounded-lg mt-4">
                  <strong>FTC Compliance:</strong> All numerical claims regarding availability and limits are accurate representations of actual system constraints.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Prohibited Actions</h2>
              <div className="space-y-4 text-gray-300">
                <p>The following actions are strictly prohibited:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Unauthorized sharing, distribution, or reproduction of PDF content</li>
                  <li>Attempting to bypass time limits or access restrictions</li>
                  <li>Reverse engineering or extracting PDF content</li>
                  <li>Using automated tools to generate multiple demos</li>
                  <li>Violating the intended personal use scope</li>
                </ul>
                <div className="bg-red-900 border border-red-400 p-4 rounded-lg">
                  <strong>Traceability Warning:</strong> All PDFs contain unique identifiers. Unauthorized sharing can be traced back to the original recipient.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Full Version Purchase</h2>
              <div className="space-y-4 text-gray-300">
                <p>For the complete Golden PDF experience:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Price: $1 USD via Ko-fi payment processor</li>
                  <li>Payment is final - <strong>no refunds available</strong></li>
                  <li>Full version includes lifetime access (subject to platform availability)</li>
                  <li>All copies are individually encrypted with AES-256</li>
                  <li>Includes Discord community access</li>
                </ul>
                <div className="bg-gray-800 border border-yellow-400 p-4 rounded-lg">
                  <strong>No Refund Policy:</strong> Due to the digital nature and instant delivery of the product, all sales are final. Please use the demo to evaluate before purchasing.
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Privacy & Data Protection</h2>
              <div className="space-y-4 text-gray-300">
                <p><strong>GDPR & CCPA Compliance:</strong></p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Email addresses are collected only with explicit consent</li>
                  <li>Data is used solely for demo access and teaser delivery</li>
                  <li>No marketing emails without separate opt-in</li>
                  <li>Right to deletion available upon request</li>
                  <li>Data retention limited to 30 days for demo accounts</li>
                  <li>Analytics use privacy-compliant Plausible (no personal data)</li>
                </ul>
                <p className="mt-4">
                  To request data deletion, contact: privacy@goldenpdf.demo
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Technical Security</h2>
              <div className="space-y-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>All PDFs use AES-256 encryption for content protection</li>
                  <li>Unique identifiers embedded for traceability</li>
                  <li>Secure viewer with copy/download restrictions</li>
                  <li>Firebase backend with enterprise-grade security</li>
                  <li>TLS 1.3 encryption for all data transmission</li>
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
                  This platform operates as a demonstration of digital content distribution technology and security measures.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">Contact Information</h2>
              <div className="space-y-4 text-gray-300">
                <ul className="list-disc list-inside space-y-2">
                  <li>Technical Support: support@goldenpdf.demo</li>
                  <li>Privacy Requests: privacy@goldenpdf.demo</li>
                  <li>Terms Questions: legal@goldenpdf.demo</li>
                  <li>Discord Community: [Link provided in full PDF]</li>
                </ul>
              </div>
            </section>

            <div className="text-center pt-8 border-t border-yellow-400">
              <p className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleDateString()} • Version 1.0
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
