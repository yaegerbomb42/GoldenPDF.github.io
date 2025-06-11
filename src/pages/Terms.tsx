import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <Card className="bg-gray-900 border-yellow-400 border-2 p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">Terms of Service</h1>
        <div className="text-gray-300 space-y-4 text-justify">
          <p>
            Welcome to The Millionaire's Secret to the Universe ("Golden PDF"). By accessing or using our website and services, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">1. Acceptance of Terms</h2>
          <p>
            By using the Golden PDF website and its associated services, you signify your acceptance of these Terms. If you do not agree to these Terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">2. Digital Product Access</h2>
          <p>
            The Golden PDF is a digital product providing access to exclusive content for a limited duration (1 hour) upon successful payment and verification. Access is granted via a unique serial number and is tied to your IP address for security purposes.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">3. Prohibited Activities</h2>
          <p>
            To protect our intellectual property and the integrity of our service, the following activities are strictly prohibited:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Screenshots, screen recording, or any form of digital capture of the PDF content.</li>
            <li>Sharing of access codes, share links, or any proprietary content with unauthorized third parties.</li>
            <li>Attempting to bypass or disable any security measures, including but not limited to developer tools detection, IP monitoring, or access duration limits.</li>
            <li>Reverse engineering, decompiling, or disassembling any part of the Golden PDF or its underlying technology.</li>
            <li>Any activity that violates applicable laws or regulations.</li>
          </ul>
          <p>
            Violation of these prohibitions will result in immediate and permanent IP banning, revocation of access, and may lead to legal action. All access is monitored and traceable.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">4. Payments and Refunds</h2>
          <p>
            All payments for the Golden PDF are processed through Ko-fi. All sales are final, and no refunds will be issued once access has been granted or the verification code has been provided.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">5. Disclaimer of Warranties</h2>
          <p>
            The Golden PDF and its content are provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, completeness, or usefulness of any information provided, nor do we warrant that the service will be uninterrupted or error-free.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">6. Limitation of Liability</h2>
          <p>
            In no event shall Golden PDF Platform or its affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the service or these Terms.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">8. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Golden PDF Platform is established, without regard to its conflict of law principles.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">9. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us through the Discord community link provided upon purchase.
          </p>
        </div>
        <div className="text-center mt-8">
          <Link to="/" className="text-yellow-400 hover:underline">Back to Home</Link>
        </div>
      </Card>
    </div>
  );
};

export default Terms;
