// src/types/index.ts - Type definitions only

// Types for Machine specifications
export interface MachineSpecs {
    body: string;
    boost: string;
    grip: string;
  }
  
  // Machine representation
  export interface Machine {
    name: string;
    pilot: string;
    specs: MachineSpecs;
    description?: string;
  }
  
  // Game representation
  export interface Game {
    id: number;
    title: string;
    leagues: string[];
    machines: Machine[];
  }
  
  // Clear data for a specific race
  export interface ClearDataItem {
    rank: number | null;
    hasScreenshot: boolean;
    screenshotUri?: string;
  }
  
  // Collection of all clear data
  export interface ClearData {
    [key: string]: ClearDataItem;
  }