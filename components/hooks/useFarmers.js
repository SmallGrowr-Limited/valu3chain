// hooks/useFarmers.js
import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { mockFarmers } from "../constants/data";
import { mockServiceRequests } from "../constants/data";

export default function useFarmers() {
  const [farmers, setFarmers] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.getFarmers();
        setFarmers(mockFarmers);
        setServiceRequests(mockServiceRequests);
      } catch (error) {
        console.error("Failed to load farmers:", error);
        Alert.alert("Error", "Failed to load farmer data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Refresh data
  const refreshData = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFarmers(mockFarmers);
      setServiceRequests(mockServiceRequests);
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Register a new farmer
  const registerFarmer = useCallback(async (newFarmer) => {
    try {
      setLoading(true);
      // In a real app: await api.registerFarmer(newFarmer);
      const farmerToAdd = {
        ...newFarmer,
        id: `farmer-${Date.now()}`,
        verified: false,
        registrationDate: new Date().toISOString(),
      };

      setFarmers((prev) => [...prev, farmerToAdd]);
      return farmerToAdd;
    } catch (error) {
      console.error("Failed to register farmer:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verify a farmer's farm
  const verifyFarm = useCallback(async (farmerId, verificationData) => {
    try {
      setLoading(true);
      // In a real app: await api.verifyFarm(farmerId, verificationData);
      setFarmers((prev) =>
        prev.map((farmer) =>
          farmer.id === farmerId
            ? {
                ...farmer,
                verified: true,
                farmLocation: verificationData.location,
                farmSize: verificationData.size,
                verificationDate: new Date().toISOString(),
              }
            : farmer
        )
      );
    } catch (error) {
      console.error("Failed to verify farm:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update farm status
  const updateFarmStatus = useCallback(async (farmerId, status) => {
    try {
      // In a real app: await api.updateFarmStatus(farmerId, status);
      setFarmers((prev) =>
        prev.map((farmer) =>
          farmer.id === farmerId
            ? { ...farmer, status, lastUpdated: new Date().toISOString() }
            : farmer
        )
      );
    } catch (error) {
      console.error("Failed to update farm status:", error);
      throw error;
    }
  }, []);

  // Handle service request actions
  const handleServiceRequestAction = useCallback(async (requestId, action) => {
    try {
      // In a real app: await api.updateServiceRequest(requestId, action);
      setServiceRequests((prev) =>
        prev.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status:
                  action === "approve"
                    ? "approved"
                    : action === "reject"
                    ? "rejected"
                    : "completed",
              }
            : request
        )
      );

      if (action === "complete") {
        Alert.alert("Success", "Service marked as completed");
      }
    } catch (error) {
      console.error("Failed to update service request:", error);
      throw error;
    }
  }, []);

  // Get pending service requests
  const pendingRequests = serviceRequests.filter(
    (request) => request.status === "pending"
  ).length;

  // Get farmer by ID
  const getFarmerById = useCallback(
    (id) => farmers.find((farmer) => farmer.id === id),
    [farmers]
  );

  return {
    farmers,
    serviceRequests,
    loading,
    refreshing,
    pendingRequests,
    registerFarmer,
    verifyFarm,
    updateFarmStatus,
    handleServiceRequestAction,
    refreshData,
    getFarmerById,
  };
}
