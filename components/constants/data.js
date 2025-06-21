export const investmentPortfolio = [
  {
    id: 1,
    category: "Dairy",
    location: "Zaria",
    amount: 75000,
    farmers: 12,
    genderRatio: { male: 0.4, female: 0.6 },
    status: "active",
    startDate: "2023-03-15",
    duration: "12 months",
    projectedROI: 18,
    currentROI: 15.5,
    riskLevel: "medium",
  },
  {
    id: 2,
    category: "Maize",
    location: "Kwara",
    amount: 120000,
    farmers: 24,
    genderRatio: { male: 0.6, female: 0.4 },
    status: "active",
    startDate: "2023-01-10",
    duration: "8 months",
    projectedROI: 15,
    currentROI: 12.2,
    riskLevel: "low",
  },
  {
    id: 3,
    category: "Cassava",
    location: "Kaduna",
    amount: 185000,
    farmers: 8,
    genderRatio: { male: 0.3, female: 0.7 },
    status: "active",
    startDate: "2023-05-20",
    duration: "18 months",
    projectedROI: 22,
    currentROI: 5.8,
    riskLevel: "high",
  },
];

export const paymentHistory = [
  {
    id: 1,
    date: "2023-06-15",
    description: "Fertilizer purchase - Zaria Co-op",
    amount: 45000,
    status: "completed",
    type: "debit",
    reference: "TX-78945",
  },
  {
    id: 2,
    date: "2023-06-10",
    description: "ROI Payment - Maize Project",
    amount: 18000,
    status: "completed",
    type: "credit",
    reference: "TX-78944",
  },
  {
    id: 3,
    date: "2023-06-05",
    description: "Seed purchase - Trans-Nzoia",
    amount: 32000,
    status: "pending",
    type: "debit",
    reference: "TX-78943",
  },
];

export const monitoringData = {
  distribution: {
    total: 500,
    distributed: 200,
    inTransit: 150,
    delivered: 100,
    remaining: 50,
  },
  updates: [
    {
      farm: "Zaria Dairy Co-op",
      status: "Received all scheduled inputs",
      date: "2023-06-14",
      progress: 100,
    },
    {
      farm: "Trans-Nozia Maize Group",
      status: "75% of inputs delivered",
      date: "2023-06-10",
      progress: 75,
    },
    {
      farm: "Kaduna Cassava Farmers",
      status: "Initial inputs distributed",
      date: "2023-06-05",
      progress: 30,
    },
  ],
  analytics: {
    cropType: {
      labels: ["Maize", "Dairy", "Cassava", "Vegetables", "Coffee"],
      data: [0.4, 0.3, 0.15, 0.1, 0.05],
    },
    location: {
      labels: ["Central", "Rift Valley", "Eastern", "Western", "Coast"],
      data: [0.25, 0.45, 0.15, 0.1, 0.05],
    },
  },
};

export const returnsData = {
  summary: {
    totalInvested: 380000,
    totalReturns: 47500,
    averageROI: 12.5,
    bestPerforming: {
      project: "Dairy - Zaria",
      roi: 15.5,
    },
    worstPerforming: {
      project: "Avocado - Saminaka",
      roi: 5.8,
    },
  },
  projects: [
    {
      id: 1,
      name: "Zaria Dairy Expansion",
      amount: 75000,
      roi: 15.5,
      duration: "9/12 months",
      status: "performing",
    },
    {
      id: 2,
      name: "Kwara Maize",
      amount: 120000,
      roi: 12.2,
      duration: "7/8 months",
      status: "performing",
    },
    {
      id: 3,
      name: "Kaduna Cassava",
      amount: 185000,
      roi: 5.8,
      duration: "1/18 months",
      status: "underperforming",
    },
  ],
};

export const marketOpportunities = [
  {
    id: 1,
    category: "Dairy",
    location: "Central Region",
    potential: "High",
    avgInvestment: 65000,
    farmersNeeded: 15,
    projectedROI: "18-24%",
    riskLevel: "Medium",
    timeframe: "6-12 months",
    description:
      "High demand for dairy inputs among female farmers in Central Region",
  },
  {
    id: 2,
    category: "Maize",
    location: "Rift Valley",
    potential: "Medium",
    avgInvestment: 45000,
    farmersNeeded: 25,
    projectedROI: "12-15%",
    riskLevel: "Low",
    timeframe: "4-8 months",
    description:
      "Maize farmers in Rift Valley showing increased productivity with improved seeds",
  },
];

export const timelineData = [
  {
    id: 1,
    event: "50 bags of fertilizer distributed to Zaria",
    date: "May 15, 2023",
    status: "distributed",
  },
  {
    id: 2,
    event: "20 irrigation kits delivered to Kasimu",
    date: "May 10, 2023",
    status: "delivered",
  },
  {
    id: 3,
    event: "30 seed packages in transit to Rukayya",
    date: "May 5, 2023",
    status: "inTransit",
  },
];

export const farmerDemographics = {
  byGender: {
    male: 42,
    female: 58,
  },
  byAge: {
    under30: 15,
    "30-50": 60,
    over50: 25,
  },
  byLocation: {
    central: 35,
    riftValley: 40,
    eastern: 15,
    western: 7,
    coast: 3,
  },
};

// data/mockFarmers.js
export const mockFarmers = [
  {
    id: 'farmer-001',
    name: 'John Kamau',
    phone: '+254712345678',
    location: 'Kiambu County',
    crops: ['Maize', 'Beans', 'Coffee'],
    verified: true,
    farmSize: 2.5,
    farmLocation: { lat: -1.1618, lng: 36.8219 },
    status: 'growing',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    registrationDate: '2023-01-15T10:30:00Z',
    verificationDate: '2023-01-20T14:15:00Z',
    lastUpdated: '2023-06-10T08:45:00Z'
  },
  {
    id: 'farmer-002',
    name: 'Mary Wanjiku',
    phone: '+254723456789',
    location: 'Murang\'a County',
    crops: ['Tea', 'Avocado'],
    verified: true,
    farmSize: 1.8,
    farmLocation: { lat: -0.7280, lng: 37.1527 },
    status: 'harvesting',
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
    registrationDate: '2023-02-10T09:15:00Z',
    verificationDate: '2023-02-15T11:20:00Z',
    lastUpdated: '2023-06-12T10:30:00Z'
  },
  {
    id: 'farmer-003',
    name: 'James Mwangi',
    phone: '+254734567890',
    location: 'Nyeri County',
    crops: ['Coffee', 'Macadamia', 'Bananas'],
    verified: true,
    farmSize: 4.2,
    farmLocation: { lat: -0.4201, lng: 36.9476 },
    status: 'planting',
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
    registrationDate: '2023-03-05T08:45:00Z',
    verificationDate: '2023-03-10T10:10:00Z',
    lastUpdated: '2023-06-15T07:20:00Z'
  },
  {
    id: 'farmer-004',
    name: 'Grace Akinyi',
    phone: '+254745678901',
    location: 'Kisumu County',
    crops: ['Rice', 'Vegetables'],
    verified: false,
    farmSize: 3.0,
    farmLocation: { lat: -0.0917, lng: 34.7680 },
    status: 'fallow',
    photo: 'https://randomuser.me/api/portraits/women/2.jpg',
    registrationDate: '2023-04-20T11:20:00Z',
    lastUpdated: '2023-06-08T09:10:00Z'
  },
  {
    id: 'farmer-005',
    name: 'Peter Kipchoge',
    phone: '+254756789012',
    location: 'Uasin Gishu County',
    crops: ['Wheat', 'Barley'],
    verified: true,
    farmSize: 5.5,
    farmLocation: { lat: 0.5143, lng: 35.2698 },
    status: 'post-harvest',
    photo: 'https://randomuser.me/api/portraits/men/3.jpg',
    registrationDate: '2023-05-15T07:30:00Z',
    verificationDate: '2023-05-20T13:45:00Z',
    lastUpdated: '2023-06-14T16:20:00Z'
  },
  {
    id: 'farmer-006',
    name: 'Sarah Chebet',
    phone: '+254767890123',
    location: 'Nakuru County',
    crops: ['Potatoes', 'Carrots', 'Cabbages'],
    verified: true,
    farmSize: 2.0,
    farmLocation: { lat: -0.3031, lng: 36.0800 },
    status: 'growing',
    photo: 'https://randomuser.me/api/portraits/women/3.jpg',
    registrationDate: '2023-01-30T14:10:00Z',
    verificationDate: '2023-02-05T09:25:00Z',
    lastUpdated: '2023-06-11T11:15:00Z'
  },
  {
    id: 'farmer-007',
    name: 'David Omondi',
    phone: '+254778901234',
    location: 'Machakos County',
    crops: ['Mangoes', 'Oranges'],
    verified: false,
    farmSize: 1.5,
    farmLocation: { lat: -1.5177, lng: 37.2634 },
    status: 'harvesting',
    photo: 'https://randomuser.me/api/portraits/men/4.jpg',
    registrationDate: '2023-03-25T10:45:00Z',
    lastUpdated: '2023-06-13T14:30:00Z'
  },
  {
    id: 'farmer-008',
    name: 'Esther Njeri',
    phone: '+254789012345',
    location: 'Meru County',
    crops: ['Miraa', 'Bananas', 'Beans'],
    verified: true,
    farmSize: 3.8,
    farmLocation: { lat: 0.0515, lng: 37.6456 },
    status: 'growing',
    photo: 'https://randomuser.me/api/portraits/women/4.jpg',
    registrationDate: '2023-02-28T08:20:00Z',
    verificationDate: '2023-03-05T11:30:00Z',
    lastUpdated: '2023-06-09T10:45:00Z'
  }
];

export const mockServiceRequests = [
  {
    id: 'req-001',
    farmerId: 'farmer-001',
    farmerName: 'John Kamau',
    serviceType: 'input',
    status: 'pending',
    date: '2023-06-15',
    priority: 'high',
    description: 'Need fertilizer for maize planting season'
  },
  {
    id: 'req-002',
    farmerId: 'farmer-002',
    farmerName: 'Mary Wanjiku',
    serviceType: 'inspection',
    status: 'approved',
    date: '2023-06-18',
    priority: 'medium',
    description: 'Request for crop health inspection'
  },
  {
    id: 'req-003',
    farmerId: 'farmer-003',
    farmerName: 'James Mwangi',
    serviceType: 'harvest',
    status: 'completed',
    date: '2023-06-10',
    priority: 'low',
    description: 'Harvest assistance needed for coffee plantation'
  },
  {
    id: 'req-004',
    farmerId: 'farmer-004',
    farmerName: 'Grace Akinyi',
    serviceType: 'soil-test',
    status: 'pending',
    date: '2023-06-17',
    priority: 'high',
    description: 'Soil testing before next planting season'
  },
  {
    id: 'req-005',
    farmerId: 'farmer-005',
    farmerName: 'Peter Kipchoge',
    serviceType: 'other',
    status: 'rejected',
    date: '2023-06-12',
    priority: 'medium',
    description: 'Request for storage facilities'
  },
  {
    id: 'req-006',
    farmerId: 'farmer-006',
    farmerName: 'Sarah Chebet',
    serviceType: 'input',
    status: 'pending',
    date: '2023-06-19',
    priority: 'high',
    description: 'Urgent need for potato seeds'
  }
];
