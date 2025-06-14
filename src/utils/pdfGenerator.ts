
// Utility functions for PDF generation and security (demo simulation)

export interface PDFGenerationOptions {
  serialNumber: string;
  email?: string;
  isDemo: boolean;
}

export interface SecurityConfig {
  encryptionKey: string;
  expirationTime: number;
  traceId: string;
}

// Simulate PDF generation with unique identifiers
export const generateUniquePDF = async (options: PDFGenerationOptions): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const pdfMetadata = {
    title: "The Millionaire's Secret to the Universe",
    serialNumber: options.serialNumber,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour
    isDemo: options.isDemo,
    version: "1.0.0"
  };
  
  console.log('Generated PDF with metadata:', pdfMetadata);
  
  // Return a simulated PDF blob URL
  return `blob:demo-pdf-${options.serialNumber}`;
};

// Simulate AES-256 encryption
export const encryptPDF = async (pdfBlob: string, config: SecurityConfig): Promise<string> => {
  // In production, this would use Web Crypto API
  const encryptedData = {
    data: pdfBlob,
    algorithm: 'AES-256-GCM',
    keyId: config.encryptionKey.substring(0, 8),
    iv: Math.random().toString(36).substring(7),
    traceId: config.traceId
  };
  
  console.log('PDF encrypted with:', { algorithm: encryptedData.algorithm, keyId: encryptedData.keyId });
  
  return JSON.stringify(encryptedData);
};

// Generate QR code data for Discord/community access
export const generateQRCode = (serialNumber: string): string => {
  const qrData = {
    type: 'discord_invite',
    serialNumber,
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
    accessLevel: 'demo'
  };
  
  return JSON.stringify(qrData);
};

// Watermark generation for traceability
export const generateWatermark = (serialNumber: string, email?: string): string => {
  const watermarkData = {
    serial: serialNumber,
    timestamp: Date.now(),
    hash: btoa(`${serialNumber}-${email || 'demo'}-${Date.now()}`).substring(0, 16)
  };
  
  return `WM:${watermarkData.hash}`;
};

// Simulate scarcity tracking
// Simulate scarcity tracking (Frontend representation - requires backend for persistence)
export class ScarcityTracker {

  // This method calls the backend endpoint to check availability
  static async checkAvailability(): Promise<{ totalRemaining: number; canGenerate: boolean }> {
    try {
      const response = await fetch('/api/check-availability');
      if (!response.ok) {
        console.error('Failed to fetch availability:', response.statusText);
        // Return a default state indicating no availability on error
        return { totalRemaining: 0, canGenerate: false };
      }
      const data = await response.json();
      // Assuming backend returns { totalCopiesRemaining: number, isAvailable: boolean }
      return { totalRemaining: data.totalCopiesRemaining, canGenerate: data.isAvailable };
    } catch (error) {
      console.error('Error checking availability:', error);
      // Return a default state indicating no availability on error
      return { totalRemaining: 0, canGenerate: false };
    }
  }

  // This method calls the backend endpoint to consume a slot and get a serial number
  static async consumeSlot(): Promise<string | null> {
    try {
      const response = await fetch('/api/consume-slot', { method: 'POST' });

      if (response.status === 409) { // Assuming 409 Conflict for no slots remaining
         console.log("No slots available (backend reported).");
         return null;
      }

      if (!response.ok) {
        console.error('Failed to consume slot:', response.statusText);
        return null;
      }

      const data = await response.json();
      // Assuming backend returns { serialNumber: string } on success
      console.log(`Slot consumed. Assigned Serial: ${data.serialNumber}`);
      return data.serialNumber;

    } catch (error) {
      console.error('Error consuming slot:', error);
      return null;
    }
  }

  // The resetSimulation method is removed as state is now managed by the backend.
}

// Firebase simulation for demo tracking
export const trackDemoGeneration = async (metadata: any): Promise<void> => {
  // Simulate Firebase write
  console.log('Demo generation tracked:', metadata);
  
  // In production, this would write to Firebase
  const demoRecord = {
    ...metadata,
    ip: 'demo.ip.hidden',
    userAgent: navigator.userAgent.substring(0, 50),
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(`demo_${metadata.serialNumber}`, JSON.stringify(demoRecord));
};
