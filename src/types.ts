export interface Bond {
  ticker: string;
  yieldRate: number;
  price: number;
  change: string;
  changePositive: boolean;
  maturity: string;
  chartPath: string;
}

export interface QuickNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
