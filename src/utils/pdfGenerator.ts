
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
export class ScarcityTracker {
  private static dailyCount = 25;
  private static totalCount = 1000;
  private static lastReset = new Date().toDateString();
  
  static checkAvailability(): { dailyRemaining: number; totalRemaining: number; canGenerate: boolean } {
    const today = new Date().toDateString();
    
    // Reset daily count at midnight UTC
    if (today !== this.lastReset) {
      this.dailyCount = 25;
      this.lastReset = today;
    }
    
    return {
      dailyRemaining: this.dailyCount,
      totalRemaining: this.totalCount,
      canGenerate: this.dailyCount > 0 && this.totalCount > 0
    };
  }
  
  static consumeSlot(): boolean {
    const availability = this.checkAvailability();
    
    if (!availability.canGenerate) {
      return false;
    }
    
    this.dailyCount--;
    this.totalCount--;
    
    console.log(`Slot consumed. Daily: ${this.dailyCount}, Total: ${this.totalCount}`);
    return true;
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
