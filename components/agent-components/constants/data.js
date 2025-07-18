export const farmersData = [
  {
    id: "1",
    name: "Kwame Yeboah",
    location: "Kumasi",
    farms: 2,
    dateJoined: "2023-05-15",
    phone: "+233 24 123 4567",
    status: "Active",
  },
  {
    id: "2",
    name: "Adwoa Mensah",
    location: "Tamale",
    farms: 1,
    dateJoined: "2023-06-22",
    phone: "+233 20 987 6543",
    status: "Active",
  },
  {
    id: "3",
    name: "Kofi Asante",
    location: "Accra",
    farms: 3,
    dateJoined: "2023-04-10",
    phone: "+233 27 555 1234",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Ama Boateng",
    location: "Koforidua",
    farms: 1,
    dateJoined: "2023-07-05",
    phone: "+233 54 321 9876",
    status: "Active",
  },
  {
    id: "5",
    name: "Yaw Osei",
    location: "Sunyani",
    farms: 2,
    dateJoined: "2023-03-18",
    phone: "+233 50 111 2222",
    status: "Active",
  },
  {
    id: "6",
    name: "Yaw Osei",
    location: "Sunyani",
    farms: 2,
    dateJoined: "2023-03-18",
    phone: "+233 50 111 2222",
    status: "Active",
  },
  {
    id: "7",
    name: "Yaw Osei",
    location: "Sunyani",
    farms: 2,
    dateJoined: "2023-03-18",
    phone: "+233 50 111 2222",
    status: "Active",
  },
  {
    id: "8",
    name: "Yaw Osei",
    location: "Sunyani",
    farms: 2,
    dateJoined: "2023-03-18",
    phone: "+233 50 111 2222",
    status: "Active",
  },
];


export const metrics = [
  {
    title: "Farmers Onboarded",
    value: "247",
    trend: "+12%",
    icon: "people",
  },
  {
    title: "Tasks Pending",
    value: "18",
    trend: "-5%",
    icon: "list",
  },
  {
    title: "Farms Audited",
    value: "189",
    trend: "+8%",
    icon: "document-text",
  },
];

export const features = [
  {
    title: "Farmers",
    icon: "person-add",
    color: "#4CAF50",
    route: "/extension-agent/home/farmers",
  },
  {
    title: "Input Request",
    icon: "help-circle",
    color: "#607D8B",
    route: "/extension-agent/home/inputs",
  },

  {
    title: "Farm Audit",
    icon: "clipboard",
    color: "#2196F3",
    route: "/extension-agent/home/audits",
  },
  {
    title: "Sales",
    icon: "stats-chart",
    color: "#9C27B0",
    route: "/extension-agent/home/inputs/distribution",
  },
  {
    title: "Market Prices",
    icon: "pricetag",
    color: "#F44336",
    route: "/extension-agent/home/market",
  },

  {
    title: "Commodity Aggregation",
    icon: "cart",
    color: "#FF9800",
    route: "/extension-agent/home/inputs/aggregation",
  },
];

export const tasks = [
  {
    title: "Farm Audit",
    farmer: "Kwame Yeboah",
    status: "Pending",
    dueDate: "Due tomorrow",
    priority: "High",
  },
  {
    title: "Input Request",
    farmer: "Adwoa Mensah",
    status: "In Progress",
    dueDate: "Due in 2 days",
    priority: "Medium",
  },
  {
    title: "Profile Completion",
    farmer: "Kofi Asante",
    status: "Pending",
    dueDate: "Due in 3 days",
    priority: "Low",
  },
  {
    title: "Fertilizer Delivery",
    farmer: "Ama Boateng",
    status: "Completed",
    dueDate: "Yesterday",
    priority: null,
  },
];
