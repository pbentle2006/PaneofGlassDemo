/**
 * Master Data Management Types
 * Defines data structures for data governance and quality management
 */

export interface DataQualityMetric {
  id: string;
  name: string;
  category: 'completeness' | 'accuracy' | 'consistency' | 'timeliness' | 'uniqueness';
  score: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  recordsAffected: number;
  lastUpdated: string;
}

export interface GoldenRecord {
  id: string;
  customerId: string;
  customerName: string;
  matchConfidence: number;
  sourceCount: number;
  sources: DataSource[];
  status: 'verified' | 'pending' | 'conflict' | 'merged';
  lastUpdated: string;
  attributes: CustomerAttribute[];
}

export interface DataSource {
  id: string;
  name: string;
  system: string;
  recordCount: number;
  lastSync: string;
  quality: number;
}

export interface CustomerAttribute {
  name: string;
  value: string;
  source: string;
  confidence: number;
  isGolden: boolean;
}

export interface DuplicateCluster {
  clusterId: string;
  recordCount: number;
  matchScore: number;
  records: DuplicateRecord[];
  suggestedAction: 'auto-merge' | 'manual-review' | 'no-action';
  priority: 'high' | 'medium' | 'low';
}

export interface DuplicateRecord {
  recordId: string;
  source: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  createdDate: string;
  lastActivity: string;
}

export interface EntityMatch {
  id: string;
  entity1: EntityReference;
  entity2: EntityReference;
  matchScore: number;
  matchType: 'exact' | 'fuzzy' | 'probabilistic';
  matchedFields: string[];
  status: 'confirmed' | 'pending' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface EntityReference {
  id: string;
  source: string;
  name: string;
  identifiers: Record<string, string>;
}

export interface DataLineageNode {
  id: string;
  name: string;
  type: 'source' | 'transformation' | 'destination' | 'reference';
  system: string;
  description: string;
  upstream: string[];
  downstream: string[];
  transformations?: string[];
  dataOwner: string;
  lastUpdated: string;
}

export interface DataQualityIssue {
  id: string;
  type: 'missing' | 'invalid' | 'duplicate' | 'inconsistent' | 'outdated';
  severity: 'critical' | 'high' | 'medium' | 'low';
  field: string;
  table: string;
  recordCount: number;
  description: string;
  suggestedFix: string;
  createdAt: string;
  status: 'open' | 'in-progress' | 'resolved';
}

export interface MDMDashboard {
  totalRecords: number;
  goldenRecords: number;
  pendingDuplicates: number;
  dataQualityScore: number;
  issuesInQueue: number;
  lastSyncTime: string;
  systemsConnected: number;
  recordsProcessedToday: number;
}
