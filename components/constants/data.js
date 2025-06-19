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
    location: "Trans-Nzoia",
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
    category: "Avocado",
    location: "Murang'a",
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
      farm: "Trans-Nzoia Maize Group",
      status: "75% of inputs delivered",
      date: "2023-06-10",
      progress: 75,
    },
    {
      farm: "Murang'a Avocado Farmers",
      status: "Initial inputs distributed",
      date: "2023-06-05",
      progress: 30,
    },
  ],
  analytics: {
    cropType: {
      labels: ["Maize", "Dairy", "Avocado", "Vegetables", "Coffee"],
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
      name: "Trans-Nzoia Maize",
      amount: 120000,
      roi: 12.2,
      duration: "7/8 months",
      status: "performing",
    },
    {
      id: 3,
      name: "Murang'a Avocado",
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
