import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <Card className="bg-gray-900 border-yellow-400 border-2 p-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">Privacy Policy</h1>
        <div className="text-gray-300 space-y-4 text-justify">
          <p>
            This Privacy Policy describes how The Millionaire's Secret to the Universe ("Golden PDF", "we", "us", or "our") collects, uses, and discloses your information when you use our website and services.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">1. Information We Collect</h2>
          <p>
            We collect minimal information necessary to provide and secure our service:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>
              **IP Address:** We collect your IP address to monitor access, detect and prevent unauthorized activities (e.g., screenshots, developer tool usage), and enforce our Terms of Service. Your IP address is used for security and analytical purposes only and is not linked to your personal identity.
            </li>
            <li>
              **Usage Data:** We may collect information on how the service is accessed and used ("Usage Data"). This Usage Data may include information such as your browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data. This is primarily for improving service performance and security.
            </li>
            <li>
              **Sender ID:** A unique, anonymous identifier generated and stored locally in your browser's `localStorage` to track your interactions with our share link feature across sessions. This ID does not contain any personal information.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">2. How We Use Your Information</h2>
          <p>
            Golden PDF uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>To provide and maintain our service.</li>
            <li>To monitor the usage of our service.</li>
            <li>To detect, prevent, and address technical issues and security breaches.</li>
            <li>To enforce our Terms of Service, including preventing unauthorized access or content sharing.</li>
            <li>To analyze and improve the performance and features of our service.</li>
          </ul>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">3. Data Retention</h2>
          <p>
            We retain your IP address and associated usage data for a limited period necessary for the purposes set out in this Privacy Policy, typically for security monitoring and analytical purposes. Sender IDs stored in `localStorage` persist until cleared by the user or browser settings.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">4. Disclosure of Data</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may disclose your information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security or integrity of our Service.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">5. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">6. Your Data Protection Rights (GDPR & CCPA)</h2>
          <p>
            While we collect minimal personal data, we respect your rights under GDPR and CCPA. You have the right to access, update, or delete the information we have on you. Please note that we primarily collect IP addresses for security, which are not directly linked to your identity. For any requests regarding your data, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-2">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the Discord community link provided upon purchase.
          </p>
        </div>
        <div className="text-center mt-8">
          <Link to="/" className="text-yellow-400 hover:underline">Back to Home</Link>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;