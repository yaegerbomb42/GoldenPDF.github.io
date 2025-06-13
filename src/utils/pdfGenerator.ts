
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

  // Frontend simulation state (NOT persistent - backend needed for actual persistence)
  // These static properties are for frontend demo/simulation purposes only.
  // The actual persistent state (total remaining count and next serial number)
  // must be managed on the backend.
  private static simulatedTotalRemaining = 1000;
  private static simulatedNextSerialNumber = 0;

  // This method should ideally call a backend endpoint to check availability
  // The backend would return the actual total remaining count and whether generation is possible.
  static checkAvailability(): { totalRemaining: number; canGenerate: boolean } {
    // In a real application, this would call a backend API, e.g.:
    // const response = await fetch('/api/scarcity/check');
    // const data = await response.json();
    // return { totalRemaining: data.totalRemaining, canGenerate: data.canGenerate };

    // For this frontend simulation, we use local state
    console.warn("ScarcityTracker.checkAvailability is a frontend simulation. Actual availability check requires backend.");
    return {
      totalRemaining: this.simulatedTotalRemaining, // This should come from backend
      canGenerate: this.simulatedTotalRemaining > 0 // This check should be done by backend
    };
  }

  // This method should ideally call a backend endpoint to consume a slot and get a serial number
  // The backend would atomically decrement the persistent count and return the assigned serial number (0-999).
  static async consumeSlot(): Promise<string | null> {
    // In a real application, this would call a backend API, e.g.:
    // const response = await fetch('/api/scarcity/consume', { method: 'POST' });
    // if (!response.ok) return null; // Backend indicates no slots
    // const data = await response.json();
    // return data.serialNumber;

    console.warn("ScarcityTracker.consumeSlot is a frontend simulation. Actual slot consumption and serial number assignment requires backend.");

    const availability = this.checkAvailability(); // Use simulated check for frontend flow

    if (!availability.canGenerate) {
      console.log("No slots available (frontend simulation).");
      return null;
    }

    // Simulate backend logic: decrement count and assign serial number
    const assignedSerialNumber = this.simulatedNextSerialNumber.toString(); // Serial numbers 0 to 999

    this.simulatedTotalRemaining--; // This decrement should happen on the backend
    this.simulatedNextSerialNumber++; // This increment should happen on the backend

    console.log(`Slot consumed (frontend simulation). Total remaining: ${this.simulatedTotalRemaining}, Assigned Serial: ${assignedSerialNumber}`);

    // Simulate backend API call delay
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate backend processing

    return assignedSerialNumber; // Return the simulated serial number
  }

  // Method to reset the simulation state (for frontend testing/demo purposes only)
  // This method should NOT exist in a production frontend connected to a persistent backend
  static resetSimulation(): void {
    console.warn("ScarcityTracker.resetSimulation is for frontend simulation ONLY. Do not use in production with a backend.");
    this.simulatedTotalRemaining = 1000;
    this.simulatedNextSerialNumber = 0;
    console.log("ScarcityTracker simulation state reset.");
  }
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
