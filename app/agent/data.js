import {SimpleLineIcons, MaterialCommunityIcons, FontAwesome6, MaterialIcons, Entypo} from "@expo/vector-icons";
export const quickAccess = [
  {
    title: "Farmers",
    icon: (
      <MaterialCommunityIcons name="account-group" size={34} color="#fff" />
    ),
    path: "/agent",
  },
  {
    title: "Request",
    icon: <FontAwesome6 name="clipboard-question" size={34} color="#fff" />,
    path: "/agent",
  },
  {
    title: "Farm Audit",
    icon: (
      <MaterialCommunityIcons name="archive-lock-open" size={34} color="#fff" />
    ),
    path: "/agent",
  },
  {
    title: "Aggregation",
    icon: <Entypo name="500px-with-circle" size={34} color="#fff" />,
    path: "/agent",
  },
  {
    title: "Market Price",
    icon: <FontAwesome6 name="sack-dollar" size={34} color="#fff" />,
    path: "/agent",
  },
  {
    title: "Support",
    icon: <FontAwesome6 name="handshake" size={34} color="#fff" />,
    path: "/agent",
  },
  {
    title: "Input Dist.",
    icon: (
      <MaterialCommunityIcons name="email-open-multiple" size={34} color="#fff" />
    ),
    path: "/agent",
  },
  {
    title: "Reports",
    icon: <Entypo name="open-book" size={34} color="#fff" />,
    path: "/agent",
  },
];