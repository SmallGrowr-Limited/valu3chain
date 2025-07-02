 const priceData = [
    { date: 'Jun 1', maize: 45, rice: 65, beans: 80, wheat: 50 },
    { date: 'Jun 2', maize: 46, rice: 64, beans: 82, wheat: 52 },
    { date: 'Jun 3', maize: 47, rice: 66, beans: 81, wheat: 51 },
    { date: 'Jun 4', maize: 48, rice: 67, beans: 83, wheat: 53 },
    { date: 'Jun 5', maize: 49, rice: 68, beans: 84, wheat: 54 },
    { date: 'Jun 6', maize: 50, rice: 69, beans: 85, wheat: 55 },
    { date: 'Jun 7', maize: 51, rice: 70, beans: 86, wheat: 56 },
  ];

  // Sample input distribution data (current month)
const distributionData = [
    { 
      region: 'North', 
      seeds: 450, 
      fertilizer: 320, 
      pesticides: 180,
      tools: 95
    },
    { 
      region: 'East', 
      seeds: 380, 
      fertilizer: 290, 
      pesticides: 150,
      tools: 80
    },
    { 
      region: 'West', 
      seeds: 520, 
      fertilizer: 410, 
      pesticides: 220,
      tools: 110
    },
    { 
      region: 'South', 
      seeds: 410, 
      fertilizer: 350, 
      pesticides: 190,
      tools: 100
    },
  ];


 const activityData = [
    {
      id: 'act-001',
      type: 'farmer_registration',
      action: 'completed',
      user: {
        name: 'Agent Kiprotich',
        role: 'Field Agent',
        region: 'Northern Region'
      },
      target: {
        name: 'Farmer Okello',
        id: 'FARM-2023-0456',
        location: 'Lira District'
      },
      details: 'New farmer registered with 5 acres of maize',
      timestamp: '2023-06-15T08:30:45Z',
      icon: 'account-plus',
      color: '#4CAF50', // Green
      priority: 'high',
      read: false
    },
    {
      id: 'act-002',
      type: 'input_request',
      action: 'approved',
      user: {
        name: 'Admin User',
        role: 'System Administrator'
      },
      target: {
        name: '50kg NPK Fertilizer',
        quantity: 25,
        requestId: 'REQ-04521'
      },
      details: 'Input request approved for Agent Nalongo',
      timestamp: '2023-06-15T10:15:22Z',
      icon: 'check-circle',
      color: '#2196F3', // Blue
      priority: 'medium',
      read: true
    },
    {
      id: 'act-003',
      type: 'farm_audit',
      action: 'submitted',
      user: {
        name: 'Agent Nalongo',
        role: 'Field Agent',
        region: 'Eastern Region'
      },
      target: {
        name: 'Farm Audit Report',
        farmId: 'FARM-2023-0456',
        acres: 5.2
      },
      details: 'Completed audit with 3 photos and soil samples',
      timestamp: '2023-06-14T14:45:10Z',
      icon: 'clipboard-check',
      color: '#FF9800', // Orange
      priority: 'medium',
      read: true
    },
    {
      id: 'act-004',
      type: 'price_update',
      action: 'system',
      user: {
        name: 'System Auto-Update',
        role: 'System'
      },
      target: {
        commodity: 'Maize',
        oldPrice: 45,
        newPrice: 47,
        unit: 'UGX/kg'
      },
      details: 'Maize price updated from UGX 45 to UGX 47 per kg',
      timestamp: '2023-06-14T09:00:00Z',
      icon: 'chart-line',
      color: '#9C27B0', // Purple
      priority: 'low',
      read: true
    },
    {
      id: 'act-005',
      type: 'distribution',
      action: 'completed',
      user: {
        name: 'Warehouse Staff',
        role: 'Logistics'
      },
      target: {
        inputType: 'Seeds',
        quantity: 150,
        unit: 'bags',
        destination: 'Northern Region'
      },
      details: '150 bags of maize seeds dispatched to Northern Region',
      timestamp: '2023-06-13T16:30:18Z',
      icon: 'truck-delivery',
      color: '#795548', // Brown
      priority: 'high',
      read: false
    },
    {
      id: 'act-006',
      type: 'partner_order',
      action: 'received',
      user: {
        name: 'AgroBuy Ltd',
        role: 'Buyer Partner',
        contact: 'orders@agrobuy.ug'
      },
      target: {
        product: 'Organic Maize',
        quantity: 2000,
        unit: 'kg',
        offerPrice: 52
      },
      details: 'New purchase order for 2000kg @ UGX 52/kg',
      timestamp: '2023-06-13T11:20:33Z',
      icon: 'cart',
      color: '#607D8B', // Blue Grey
      priority: 'high',
      read: false
    },
    {
      id: 'act-007',
      type: 'investment',
      action: 'approved',
      user: {
        name: 'Admin User',
        role: 'System Administrator'
      },
      target: {
        partner: 'GreenFuture Investments',
        amount: 25000000,
        currency: 'UGX',
        purpose: 'Solar Irrigation'
      },
      details: 'Approved UGX 25M investment for solar irrigation',
      timestamp: '2023-06-12T15:10:47Z',
      icon: 'cash-multiple',
      color: '#009688', // Teal
      priority: 'high',
      read: true
    }
  ];

  export default {activityData, distributionData, priceData }
  