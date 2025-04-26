// src/types/index.ts の内容
export interface Machine {
    name: string;
    pilot: string;
    specs: {
      boost: string;
      body: string;
      grip: string;
    };
    description: string;
  }
  
  export interface Game {
    id: number;
    title: string;
    leagues: string[];
    machines: Machine[];
  }
  
  export interface ClearData {
    [key: string]: {
      rank: number | null;
      hasScreenshot: boolean;
      screenshotUri?: string;
    };
  }