
export interface PartnershipData {
  companyName: string;
  industry: string;
  treeGoal: string;
  contactName: string;
  email: string;
}

export enum FormStep {
  DETAILS = 1,
  REVIEW = 2
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface AIInsight {
  text: string;
  sources?: GroundingChunk[];
}
