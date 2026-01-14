/**
 * Master Data Management Mock Data
 * Sample data for data governance and quality scenarios
 */

import type {
  DataQualityMetric,
  GoldenRecord,
  DuplicateCluster,
  EntityMatch,
  DataLineageNode,
  DataQualityIssue,
  MDMDashboard,
  DataSource,
} from './types';

// Dashboard Overview
export const MDM_DASHBOARD: MDMDashboard = {
  totalRecords: 2_456_789,
  goldenRecords: 2_234_567,
  pendingDuplicates: 847,
  dataQualityScore: 94.2,
  issuesInQueue: 156,
  lastSyncTime: '2025-01-14T08:45:00Z',
  systemsConnected: 12,
  recordsProcessedToday: 45_678,
};

// Data Sources
export const DATA_SOURCES: DataSource[] = [
  {
    id: 'src-001',
    name: 'Core Banking System',
    system: 'CBS',
    recordCount: 1_850_000,
    lastSync: '2025-01-14T08:30:00Z',
    quality: 96.5,
  },
  {
    id: 'src-002',
    name: 'CRM Platform',
    system: 'Salesforce',
    recordCount: 2_100_000,
    lastSync: '2025-01-14T08:45:00Z',
    quality: 92.3,
  },
  {
    id: 'src-003',
    name: 'Digital Banking',
    system: 'Digital',
    recordCount: 1_200_000,
    lastSync: '2025-01-14T08:40:00Z',
    quality: 98.1,
  },
  {
    id: 'src-004',
    name: 'Branch Systems',
    system: 'Branch',
    recordCount: 980_000,
    lastSync: '2025-01-14T07:00:00Z',
    quality: 88.7,
  },
  {
    id: 'src-005',
    name: 'Credit Card System',
    system: 'Cards',
    recordCount: 750_000,
    lastSync: '2025-01-14T08:35:00Z',
    quality: 94.8,
  },
];

// Data Quality Metrics
export const DATA_QUALITY_METRICS: DataQualityMetric[] = [
  {
    id: 'dq-001',
    name: 'Email Completeness',
    category: 'completeness',
    score: 94.2,
    target: 95.0,
    trend: 'up',
    recordsAffected: 142_567,
    lastUpdated: '2025-01-14T08:00:00Z',
  },
  {
    id: 'dq-002',
    name: 'Phone Number Accuracy',
    category: 'accuracy',
    score: 89.7,
    target: 92.0,
    trend: 'stable',
    recordsAffected: 252_890,
    lastUpdated: '2025-01-14T08:00:00Z',
  },
  {
    id: 'dq-003',
    name: 'Address Consistency',
    category: 'consistency',
    score: 91.5,
    target: 93.0,
    trend: 'up',
    recordsAffected: 208_456,
    lastUpdated: '2025-01-14T08:00:00Z',
  },
  {
    id: 'dq-004',
    name: 'Record Timeliness',
    category: 'timeliness',
    score: 97.8,
    target: 95.0,
    trend: 'stable',
    recordsAffected: 54_123,
    lastUpdated: '2025-01-14T08:00:00Z',
  },
  {
    id: 'dq-005',
    name: 'Customer Uniqueness',
    category: 'uniqueness',
    score: 99.6,
    target: 99.5,
    trend: 'up',
    recordsAffected: 9_847,
    lastUpdated: '2025-01-14T08:00:00Z',
  },
];

// Golden Records (sample)
export const GOLDEN_RECORDS: GoldenRecord[] = [
  {
    id: 'gr-001',
    customerId: 'CUST-2024-001234',
    customerName: 'Robert James Anderson',
    matchConfidence: 98.5,
    sourceCount: 4,
    sources: [
      { id: 'src-001', name: 'Core Banking', system: 'CBS', recordCount: 1, lastSync: '2025-01-14', quality: 98 },
      { id: 'src-002', name: 'CRM', system: 'Salesforce', recordCount: 1, lastSync: '2025-01-14', quality: 95 },
      { id: 'src-003', name: 'Digital', system: 'Digital', recordCount: 1, lastSync: '2025-01-14', quality: 97 },
      { id: 'src-005', name: 'Cards', system: 'Cards', recordCount: 1, lastSync: '2025-01-14', quality: 96 },
    ],
    status: 'verified',
    lastUpdated: '2025-01-14T06:30:00Z',
    attributes: [
      { name: 'Full Name', value: 'Robert James Anderson', source: 'CBS', confidence: 100, isGolden: true },
      { name: 'Email', value: 'r.anderson@email.com', source: 'Digital', confidence: 98, isGolden: true },
      { name: 'Phone', value: '+61 412 345 678', source: 'CBS', confidence: 100, isGolden: true },
      { name: 'Address', value: '45 Collins St, Melbourne VIC 3000', source: 'CBS', confidence: 95, isGolden: true },
    ],
  },
  {
    id: 'gr-002',
    customerId: 'CUST-2024-005678',
    customerName: 'Sarah Michelle Chen',
    matchConfidence: 92.3,
    sourceCount: 3,
    sources: [
      { id: 'src-001', name: 'Core Banking', system: 'CBS', recordCount: 1, lastSync: '2025-01-14', quality: 94 },
      { id: 'src-002', name: 'CRM', system: 'Salesforce', recordCount: 2, lastSync: '2025-01-14', quality: 88 },
      { id: 'src-004', name: 'Branch', system: 'Branch', recordCount: 1, lastSync: '2025-01-13', quality: 91 },
    ],
    status: 'conflict',
    lastUpdated: '2025-01-14T07:15:00Z',
    attributes: [
      { name: 'Full Name', value: 'Sarah Michelle Chen', source: 'CBS', confidence: 100, isGolden: true },
      { name: 'Email', value: 's.chen@company.com', source: 'CRM', confidence: 85, isGolden: false },
      { name: 'Email', value: 'sarah.chen@gmail.com', source: 'Digital', confidence: 92, isGolden: true },
      { name: 'Phone', value: '+61 423 456 789', source: 'CBS', confidence: 100, isGolden: true },
    ],
  },
];

// Duplicate Clusters
export const DUPLICATE_CLUSTERS: DuplicateCluster[] = [
  {
    clusterId: 'dup-001',
    recordCount: 3,
    matchScore: 94.5,
    suggestedAction: 'auto-merge',
    priority: 'high',
    records: [
      {
        recordId: 'rec-001-a',
        source: 'Core Banking',
        customerName: 'Michael David Brown',
        email: 'm.brown@email.com',
        phone: '+61 434 567 890',
        address: '12 George St, Sydney NSW 2000',
        createdDate: '2020-03-15',
        lastActivity: '2025-01-10',
      },
      {
        recordId: 'rec-001-b',
        source: 'CRM',
        customerName: 'Mike D Brown',
        email: 'mike.brown@email.com',
        phone: '+61434567890',
        address: '12 George Street, Sydney 2000',
        createdDate: '2021-06-22',
        lastActivity: '2025-01-12',
      },
      {
        recordId: 'rec-001-c',
        source: 'Digital',
        customerName: 'Michael Brown',
        email: 'm.brown@email.com',
        phone: '0434567890',
        address: '12 George St, Sydney',
        createdDate: '2023-01-05',
        lastActivity: '2025-01-14',
      },
    ],
  },
  {
    clusterId: 'dup-002',
    recordCount: 2,
    matchScore: 87.2,
    suggestedAction: 'manual-review',
    priority: 'medium',
    records: [
      {
        recordId: 'rec-002-a',
        source: 'Core Banking',
        customerName: 'Jennifer Lee Wong',
        email: 'j.wong@work.com',
        phone: '+61 445 678 901',
        address: '88 Pitt St, Sydney NSW 2000',
        createdDate: '2019-08-20',
        lastActivity: '2025-01-08',
      },
      {
        recordId: 'rec-002-b',
        source: 'Branch',
        customerName: 'Jenny Wong',
        email: 'jenny.wong@personal.com',
        phone: '+61 445 678 902',
        address: '88 Pitt Street, Sydney 2000',
        createdDate: '2022-11-30',
        lastActivity: '2025-01-05',
      },
    ],
  },
  {
    clusterId: 'dup-003',
    recordCount: 4,
    matchScore: 91.8,
    suggestedAction: 'auto-merge',
    priority: 'high',
    records: [
      {
        recordId: 'rec-003-a',
        source: 'Core Banking',
        customerName: 'Thompson Industries Pty Ltd',
        email: 'accounts@thompson.com.au',
        phone: '+61 2 9876 5432',
        address: '100 Market St, Melbourne VIC 3000',
        createdDate: '2018-02-14',
        lastActivity: '2025-01-13',
      },
      {
        recordId: 'rec-003-b',
        source: 'CRM',
        customerName: 'Thompson Industries',
        email: 'info@thompson.com.au',
        phone: '+61 2 9876 5432',
        address: '100 Market Street, Melbourne 3000',
        createdDate: '2019-05-20',
        lastActivity: '2025-01-12',
      },
      {
        recordId: 'rec-003-c',
        source: 'Cards',
        customerName: 'Thompson Industries P/L',
        email: 'accounts@thompson.com.au',
        phone: '0298765432',
        address: '100 Market St Melbourne',
        createdDate: '2020-09-10',
        lastActivity: '2025-01-11',
      },
      {
        recordId: 'rec-003-d',
        source: 'Branch',
        customerName: 'Thompson Ind Pty Ltd',
        email: 'mel@thompson.com.au',
        phone: '+61 3 9876 5433',
        address: '100 Market St, Melbourne VIC',
        createdDate: '2021-03-25',
        lastActivity: '2025-01-09',
      },
    ],
  },
];

// Entity Matches for resolution
export const ENTITY_MATCHES: EntityMatch[] = [
  {
    id: 'match-001',
    entity1: {
      id: 'ent-001-a',
      source: 'Core Banking',
      name: 'ABC Holdings Ltd',
      identifiers: { ABN: '12345678901', ACN: '123456789' },
    },
    entity2: {
      id: 'ent-001-b',
      source: 'CRM',
      name: 'ABC Holdings Limited',
      identifiers: { ABN: '12345678901' },
    },
    matchScore: 96.8,
    matchType: 'exact',
    matchedFields: ['ABN', 'Name (fuzzy)'],
    status: 'pending',
  },
  {
    id: 'match-002',
    entity1: {
      id: 'ent-002-a',
      source: 'Digital',
      name: 'Smith & Partners',
      identifiers: { email: 'contact@smithpartners.com.au' },
    },
    entity2: {
      id: 'ent-002-b',
      source: 'Branch',
      name: 'Smith and Partners Consulting',
      identifiers: { phone: '+61298761234' },
    },
    matchScore: 78.5,
    matchType: 'fuzzy',
    matchedFields: ['Name (fuzzy)', 'Address (partial)'],
    status: 'pending',
  },
];

// Data Lineage
export const DATA_LINEAGE: DataLineageNode[] = [
  {
    id: 'node-001',
    name: 'Core Banking System',
    type: 'source',
    system: 'CBS',
    description: 'Primary customer master data source',
    upstream: [],
    downstream: ['node-004'],
    dataOwner: 'Core Banking Team',
    lastUpdated: '2025-01-14T08:30:00Z',
  },
  {
    id: 'node-002',
    name: 'CRM Platform',
    type: 'source',
    system: 'Salesforce',
    description: 'Customer relationship and interaction data',
    upstream: [],
    downstream: ['node-004'],
    dataOwner: 'Sales Operations',
    lastUpdated: '2025-01-14T08:45:00Z',
  },
  {
    id: 'node-003',
    name: 'Digital Banking',
    type: 'source',
    system: 'Digital',
    description: 'Online and mobile banking customer data',
    upstream: [],
    downstream: ['node-004'],
    dataOwner: 'Digital Team',
    lastUpdated: '2025-01-14T08:40:00Z',
  },
  {
    id: 'node-004',
    name: 'MDM Hub',
    type: 'transformation',
    system: 'Informatica MDM',
    description: 'Master Data Management hub - golden record creation',
    upstream: ['node-001', 'node-002', 'node-003'],
    downstream: ['node-005', 'node-006', 'node-007'],
    transformations: [
      'Record matching and deduplication',
      'Data standardization',
      'Golden record survivorship',
      'Cross-reference linking',
    ],
    dataOwner: 'Data Governance Team',
    lastUpdated: '2025-01-14T08:50:00Z',
  },
  {
    id: 'node-005',
    name: 'Data Warehouse',
    type: 'destination',
    system: 'Snowflake',
    description: 'Enterprise data warehouse for analytics',
    upstream: ['node-004'],
    downstream: [],
    dataOwner: 'Analytics Team',
    lastUpdated: '2025-01-14T09:00:00Z',
  },
  {
    id: 'node-006',
    name: 'Marketing Platform',
    type: 'destination',
    system: 'Adobe Campaign',
    description: 'Customer data for marketing campaigns',
    upstream: ['node-004'],
    downstream: [],
    dataOwner: 'Marketing Team',
    lastUpdated: '2025-01-14T08:55:00Z',
  },
  {
    id: 'node-007',
    name: 'Regulatory Reporting',
    type: 'destination',
    system: 'Regulatory Hub',
    description: 'Customer data for APRA/ASIC reporting',
    upstream: ['node-004'],
    downstream: [],
    dataOwner: 'Compliance Team',
    lastUpdated: '2025-01-14T07:00:00Z',
  },
];

// Data Quality Issues
export const DATA_QUALITY_ISSUES: DataQualityIssue[] = [
  {
    id: 'issue-001',
    type: 'missing',
    severity: 'high',
    field: 'email_address',
    table: 'customer_contact',
    recordCount: 45_678,
    description: 'Missing email addresses for business banking customers',
    suggestedFix: 'Run email enrichment service or trigger customer outreach',
    createdAt: '2025-01-13T10:00:00Z',
    status: 'in-progress',
  },
  {
    id: 'issue-002',
    type: 'invalid',
    severity: 'critical',
    field: 'phone_number',
    table: 'customer_contact',
    recordCount: 12_456,
    description: 'Invalid phone number format - missing country code',
    suggestedFix: 'Apply phone number standardization transformation',
    createdAt: '2025-01-12T14:30:00Z',
    status: 'open',
  },
  {
    id: 'issue-003',
    type: 'duplicate',
    severity: 'high',
    field: 'customer_id',
    table: 'customer_master',
    recordCount: 847,
    description: 'Potential duplicate customer records across systems',
    suggestedFix: 'Review and merge using MDM matching rules',
    createdAt: '2025-01-14T08:00:00Z',
    status: 'open',
  },
  {
    id: 'issue-004',
    type: 'inconsistent',
    severity: 'medium',
    field: 'address',
    table: 'customer_address',
    recordCount: 23_890,
    description: 'Address format inconsistency between CBS and CRM',
    suggestedFix: 'Apply address standardization using GNAF',
    createdAt: '2025-01-11T09:15:00Z',
    status: 'open',
  },
  {
    id: 'issue-005',
    type: 'outdated',
    severity: 'medium',
    field: 'last_verified_date',
    table: 'customer_kyc',
    recordCount: 156_234,
    description: 'KYC records not verified in 12+ months',
    suggestedFix: 'Trigger KYC refresh workflow for affected customers',
    createdAt: '2025-01-10T11:00:00Z',
    status: 'in-progress',
  },
];

// Helper functions
export function getIssuesBySeverity() {
  return {
    critical: DATA_QUALITY_ISSUES.filter(i => i.severity === 'critical'),
    high: DATA_QUALITY_ISSUES.filter(i => i.severity === 'high'),
    medium: DATA_QUALITY_ISSUES.filter(i => i.severity === 'medium'),
    low: DATA_QUALITY_ISSUES.filter(i => i.severity === 'low'),
  };
}

export function getDuplicatesByPriority() {
  return {
    high: DUPLICATE_CLUSTERS.filter(d => d.priority === 'high'),
    medium: DUPLICATE_CLUSTERS.filter(d => d.priority === 'medium'),
    low: DUPLICATE_CLUSTERS.filter(d => d.priority === 'low'),
  };
}

export function getMetricsByCategory() {
  return {
    completeness: DATA_QUALITY_METRICS.filter(m => m.category === 'completeness'),
    accuracy: DATA_QUALITY_METRICS.filter(m => m.category === 'accuracy'),
    consistency: DATA_QUALITY_METRICS.filter(m => m.category === 'consistency'),
    timeliness: DATA_QUALITY_METRICS.filter(m => m.category === 'timeliness'),
    uniqueness: DATA_QUALITY_METRICS.filter(m => m.category === 'uniqueness'),
  };
}
